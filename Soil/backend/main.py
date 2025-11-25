from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import os
import uuid
from datetime import datetime
import shutil

from model_loader import ModelInference
from recommendation_engine import get_recommendations, generate_advice_text
from pdf_generator import create_soil_passport_pdf

# FastAPI ni ishga tushirish
app = FastAPI(
    title="Tuproq Tahlili API",
    description="AI asosidagi tuproq tasnifi va tahlili",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ishlab chiqarishda aniq manbalarni ko'rsating
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Papkalar
UPLOAD_DIR = "./uploads"
PDF_DIR = "./pdf"
MODEL_PATH = "./models/soil_classifier.pt"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PDF_DIR, exist_ok=True)

# Sinf nomlari (o'qitish bilan mos kelishi kerak)
CLASS_NAMES = ['alluvial', 'meadow', 'serozem', 'solonchak', 'takyr']

# Global model instance
model = None


@app.on_event("startup")
async def load_model():
    """Ishga tushirishda modelni yuklash"""
    global model
    try:
        model = ModelInference(
            model_path=MODEL_PATH,
            class_names=CLASS_NAMES,
            device='cpu'
        )
        print("✓ Model muvaffaqiyatli yuklandi")
    except Exception as e:
        print(f"✗ Modelni yuklashda xatolik: {e}")
        raise


@app.get("/")
async def root():
    """Asosiy endpoint"""
    return {
        "message": "Tuproq Tahlili API",
        "version": "1.0.0",
        "status": "ishlayapti"
    }


@app.get("/health")
async def health_check():
    """Sog'liqni tekshirish endpoint"""
    return {
        "status": "sog'lom",
        "model_loaded": model is not None,
        "timestamp": datetime.now().isoformat()
    }


@app.post("/analyze-soil")
async def analyze_soil(file: UploadFile = File(...)):
    """
    Yuklangan rasmdan tuproqni tahlil qilish
    
    Qaytaradi:
        JSON: tuproq tasnifi, tavsiyalar va PDF havolasi
    """
    
    if model is None:
        raise HTTPException(status_code=500, detail="Model yuklanmagan")
    
    # Faylni tekshirish
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Fayl rasm bo'lishi kerak")
    
    try:
        # Noyob ID yaratish
        analysis_id = str(uuid.uuid4())[:8]
        
        # Yuklangan faylni saqlash
        file_ext = os.path.splitext(file.filename)[1]
        upload_path = os.path.join(UPLOAD_DIR, f"{analysis_id}{file_ext}")
        
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Rasmni ochish
        image = Image.open(upload_path)
        
        # Inference
        prediction = model.predict(image)
        
        # Tavsiyalarni olish
        recommendations = get_recommendations(
            soil_type=prediction['soil_type'],
            confidence=prediction['confidence']
        )
        
        # Maslahat matnini yaratish
        advice_text = generate_advice_text(recommendations)
        
        # PDF yaratish
        pdf_filename = f"TuproqPasporti_{analysis_id}.pdf"
        pdf_path = os.path.join(PDF_DIR, pdf_filename)
        
        create_soil_passport_pdf(
            output_path=pdf_path,
            soil_image_path=upload_path,
            analysis_results=prediction,
            recommendations=recommendations,
            analysis_id=analysis_id
        )
        
        # Javobni tayyorlash
        response = {
            "analysis_id": analysis_id,
            "timestamp": datetime.now().isoformat(),
            "soil_type": prediction['soil_type'],
            "confidence": prediction['confidence'],
            "all_probabilities": prediction['all_probabilities'],
            "description": recommendations['description'],
            "characteristics": recommendations['characteristics'],
            "npk_analysis": recommendations['npk_analysis'],
            "fertilizer_advice": recommendations['fertilizer_advice'],
            "crop_recommendations": recommendations['crop_recommendations'],
            "management_tips": recommendations['management_tips'],
            "advice_text": advice_text,
            "soil_passport_pdf_url": f"/soil-passport/{pdf_filename}"
        }
        
        return JSONResponse(content=response)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tahlil muvaffaqiyatsiz: {str(e)}")


@app.get("/soil-passport/{filename}")
async def get_soil_passport(filename: str):
    """
    Tuproq pasporti PDF ni yuklab olish
    """
    pdf_path = os.path.join(PDF_DIR, filename)
    
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="PDF topilmadi")
    
    return FileResponse(
        pdf_path,
        media_type='application/pdf',
        filename=filename
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)