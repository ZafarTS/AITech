from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import qrcode
from io import BytesIO
from datetime import datetime
import os

def generate_qr_code(data):
    """QR kod rasmi yaratish"""
    qr = qrcode.QRCode(version=1, box_size=10, border=2)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    # BytesIO ga aylantirish
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    return buffer


def create_soil_passport_pdf(
    output_path,
    soil_image_path,
    analysis_results,
    recommendations,
    analysis_id
):
    """
    Professional AI Tuproq Pasporti PDF yaratish
    
    Args:
        output_path: PDF saqlash yo'li
        soil_image_path: Tuproq rasmi yo'li
        analysis_results: Bashorat natijalari dict
        recommendations: Tavsiyalar dict
        analysis_id: Noyob tahlil ID
    """
    
    # PDF yaratish
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    # Uslublar
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#2E7D32'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#2E7D32'),
        spaceAfter=12,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['BodyText'],
        fontSize=10,
        spaceAfter=6
    )
    
    # Kontent yaratish
    content = []
    
    # Sarlavha
    content.append(Paragraph("🌱 AI TUPROQ PASPORTI", title_style))
    content.append(Paragraph("Aqlli Tuproq Tahlili Hisoboti", styles['Normal']))
    content.append(Spacer(1, 0.5*cm))
    
    # Tahlil ma'lumoti
    analysis_date = datetime.now().strftime("%d %B %Y, %H:%M")
    info_text = f"<b>Tahlil ID:</b> {analysis_id}<br/><b>Sana:</b> {analysis_date}"
    content.append(Paragraph(info_text, body_style))
    content.append(Spacer(1, 0.5*cm))
    
    # Tuproq rasmi
    if os.path.exists(soil_image_path):
        try:
            img = Image(soil_image_path, width=8*cm, height=6*cm)
            content.append(img)
            content.append(Spacer(1, 0.3*cm))
        except:
            pass
    
    # Tasnif natijalari
    content.append(Paragraph("TUPROQ TASNIFI", heading_style))
    
    class_data = [
        ['Tuproq Turi:', analysis_results['soil_type'].upper()],
        ['Ishonch:', f"{analysis_results['confidence']:.1%}"],
        ['Holat:', recommendations['confidence_note']]
    ]
    
    class_table = Table(class_data, colWidths=[5*cm, 10*cm])
    class_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#E8F5E9')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey)
    ]))
    
    content.append(class_table)
    content.append(Spacer(1, 0.5*cm))
    
    # Tavsif
    content.append(Paragraph(recommendations['description'], body_style))
    content.append(Spacer(1, 0.3*cm))
    
    # Xususiyatlar
    content.append(Paragraph("TUPROQ XUSUSIYATLARI", heading_style))
    char = recommendations['characteristics']
    char_text = f"""
    • <b>pH Oralig'i:</b> {char['ph_range']}<br/>
    • <b>Organik Modda:</b> {char['organic_matter']}<br/>
    • <b>Suv Ushlab Turish:</b> {char['water_retention']}<br/>
    • <b>Sho'rlanish Xavfi:</b> {char['salinity_risk']}
    """
    content.append(Paragraph(char_text, body_style))
    content.append(Spacer(1, 0.3*cm))
    
    # NPK Holati
    content.append(Paragraph("OZUQA HOLATI (NPK)", heading_style))
    npk = recommendations['npk_analysis']
    npk_text = f"""
    • <b>Azot (N):</b> {npk['nitrogen']}<br/>
    • <b>Fosfor (P):</b> {npk['phosphorus']}<br/>
    • <b>Kaliy (K):</b> {npk['potassium']}
    """
    content.append(Paragraph(npk_text, body_style))
    content.append(Spacer(1, 0.3*cm))
    
    # O'g'it Tavsiyalari
    content.append(Paragraph("O'G'IT TAVSIYALARI", heading_style))
    fert = recommendations['fertilizer_advice']
    fert_text = f"""
    • <b>Azot:</b> {fert['nitrogen']}<br/>
    • <b>Fosfor:</b> {fert['phosphorus']}<br/>
    • <b>Kaliy:</b> {fert['potassium']}
    """
    content.append(Paragraph(fert_text, body_style))
    content.append(Spacer(1, 0.3*cm))
    
    # Eng yaxshi ekinlar
    content.append(Paragraph("TAVSIYA ETILADIGAN EKINLAR", heading_style))
    for i, crop in enumerate(recommendations['crop_recommendations'][:5], 1):
        stars = '★' * crop['suitability'] + '☆' * (5 - crop['suitability'])
        crop_text = f"{i}. <b>{crop['name']}</b> - Kutilayotgan Hosildorlik: {crop['yield']} {stars}"
        content.append(Paragraph(crop_text, body_style))
    content.append(Spacer(1, 0.3*cm))
    
    # Boshqaruv Maslahatlari
    content.append(Paragraph("BOSHQARUV MASLAHATLARI", heading_style))
    for tip in recommendations['management_tips']:
        content.append(Paragraph(f"• {tip}", body_style))
    content.append(Spacer(1, 0.5*cm))
    
    # QR Kod
    qr_data = f"https://soilscan.uz/analysis/{analysis_id}"
    qr_buffer = generate_qr_code(qr_data)
    qr_img = Image(qr_buffer, width=3*cm, height=3*cm)
    content.append(qr_img)
    content.append(Paragraph(f"Raqamli versiya uchun skanerlang", styles['Normal']))
    content.append(Spacer(1, 0.3*cm))
    
    # Pastki yozuv
    footer_text = """
    <i>AgriScan AI v1.0 tomonidan yaratilgan<br/>
    ⚠️ Faqat ma'lumot uchun. Aniq tavsiyalar uchun mahalliy agronomlar bilan maslahatlashing.<br/>
    Bu tahlil AI ko'rish texnologiyasiga asoslangan va muhim qarorlar uchun laboratoriya tekshiruvi bilan to'ldirilishi kerak.</i>
    """
    content.append(Paragraph(footer_text, styles['Normal']))
    
    # PDF yaratish
    doc.build(content)
    print(f"✓ PDF yaratildi: {output_path}")