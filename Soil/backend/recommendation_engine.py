"""
Ekin, NPK tavsiyalari va dehqonchilik maslahatlari uchun tavsiya tizimi
O'zbekiston qishloq xo'jaligi sharoitlariga asoslangan
"""

SOIL_DATABASE = {
    'serozem': {
        'description': 'Kulrang cho\'l tuproq, Farg\'ona vodiysida keng tarqalgan',
        'ph_range': '7.5-8.5',
        'typical_organic_matter': '1.5-2.5%',
        'water_retention': 'O\'rta',
        'common_issues': ['Organik moddalar kam', 'Ishqoriylik', 'Zichlashuv'],
        'npk_status': {
            'nitrogen': 'Kam dan O\'rta gacha',
            'phosphorus': 'Kam',
            'potassium': 'O\'rta dan Yuqori gacha'
        },
        'fertilizer_recommendation': {
            'nitrogen': 'Ekishdan oldin 100-120 kg/ga karbamid qo\'shing',
            'phosphorus': '80-100 kg/ga superfosfat qo\'shing',
            'potassium': 'Odatda yetarli, qo\'shishdan oldin tekshiring'
        },
        'top_crops': [
            {'name': 'Kuzgi Bug\'doy', 'yield': '4.5-6.0 t/ga', 'suitability': 5},
            {'name': 'Paxta', 'yield': '2.8-3.5 t/ga', 'suitability': 5},
            {'name': 'Qovun', 'yield': '25-30 t/ga', 'suitability': 4},
            {'name': 'Uzum', 'yield': '15-20 t/ga', 'suitability': 4},
            {'name': 'Pomidor', 'yield': '40-50 t/ga', 'suitability': 4}
        ],
        'management_tips': [
            'Tuzilishni yaxshilash uchun organik modda (kompost, go\'ng) qo\'shing',
            'Tuz to\'planishining oldini olish uchun tomchilatib sug\'orish usulidan foydalaning',
            'Azotni tabiiy oshirish uchun dukkakli o\'simliklar bilan almashtirib eking'
        ],
        'salinity_risk': 'O\'rta'
    },
    'meadow': {
        'description': 'Sug\'oriladigan yaylov tuproq, unumli va mahsuldor',
        'ph_range': '7.0-8.0',
        'typical_organic_matter': '2.5-4.0%',
        'water_retention': 'Yuqori',
        'common_issues': ['Ortiqcha sug\'orish', 'Suv to\'planishi', 'Sho\'rlanish'],
        'npk_status': {
            'nitrogen': 'O\'rta dan Yuqori gacha',
            'phosphorus': 'O\'rta',
            'potassium': 'Yuqori'
        },
        'fertilizer_recommendation': {
            'nitrogen': '80-100 kg/ga karbamid, bo\'lib-bo\'lib bering',
            'phosphorus': '60-80 kg/ga superfosfat qo\'shing',
            'potassium': 'Odatda yetarli'
        },
        'top_crops': [
            {'name': 'Sholi', 'yield': '5.0-7.0 t/ga', 'suitability': 5},
            {'name': 'Sabzavotlar (Aralash)', 'yield': 'Turlicha', 'suitability': 5},
            {'name': 'Beda', 'yield': '60-80 t/ga yangi', 'suitability': 5},
            {'name': 'Makkajo\'xori', 'yield': '6.0-8.0 t/ga', 'suitability': 4},
            {'name': 'Qovun', 'yield': '30-35 t/ga', 'suitability': 4}
        ],
        'management_tips': [
            'Suv to\'planishining oldini olish uchun drenajni kuzating',
            'Tuz to\'planishini oldini olish uchun sug\'orishni nazorat qiling',
            'Intensiv sabzavot yetishtirish uchun a\'lo'
        ],
        'salinity_risk': 'O\'rta dan Yuqori (agar drenaj yomon bo\'lsa)'
    },
    'takyr': {
        'description': 'Og\'ir loyli cho\'l tuproq, ishlov berish qiyin',
        'ph_range': '8.0-9.0',
        'typical_organic_matter': '0.5-1.5%',
        'water_retention': 'Juda yuqori (yomon drenaj)',
        'common_issues': ['Og\'ir tekstura', 'Yomon drenaj', 'Yuqori ishqoriylik', 'Yorilib ketish'],
        'npk_status': {
            'nitrogen': 'Juda kam',
            'phosphorus': 'Kam',
            'potassium': 'O\'rta'
        },
        'fertilizer_recommendation': {
            'nitrogen': '120-150 kg/ga karbamid + organik modda qo\'shing',
            'phosphorus': '100-120 kg/ga superfosfat qo\'shing',
            'potassium': '60-80 kg/ga kaliy sulfat qo\'shing'
        },
        'top_crops': [
            {'name': 'Sholi (tayyorgarlik bilan)', 'yield': '4.0-5.5 t/ga', 'suitability': 3},
            {'name': 'Paxta (yaxshilangan navlar)', 'yield': '2.0-2.8 t/ga', 'suitability': 3},
            {'name': 'Kungaboqar', 'yield': '1.5-2.0 t/ga', 'suitability': 4},
            {'name': 'Arpa', 'yield': '3.0-4.0 t/ga', 'suitability': 3}
        ],
        'management_tips': [
            'Tuzilishni yaxshilash uchun gips (2-3 t/ga) qo\'shing',
            'Ekishdan oldin chuqur haydash',
            'Ko\'p miqdorda organik modda qo\'shing',
            'Yaxshiroq drenaj uchun baland to\'shaklarni ko\'rib chiqing'
        ],
        'salinity_risk': 'Kam (lekin ishlov berish qiyin)'
    },
    'alluvial': {
        'description': 'Daryo vodiysi tuproq, juda unumli va mahsuldor',
        'ph_range': '6.5-7.5',
        'typical_organic_matter': '3.0-5.0%',
        'water_retention': 'Yuqori',
        'common_issues': ['Suv toshish xavfi', 'O\'zgaruvchan tekstura', 'Ba\'zan toshlar'],
        'npk_status': {
            'nitrogen': 'Yuqori',
            'phosphorus': 'O\'rta dan Yuqori gacha',
            'potassium': 'Yuqori'
        },
        'fertilizer_recommendation': {
            'nitrogen': '60-80 kg/ga karbamid (tabiiy unumdorligi tufayli kamroq)',
            'phosphorus': '40-60 kg/ga superfosfat qo\'shing',
            'potassium': 'Odatda kerak emas'
        },
        'top_crops': [
            {'name': 'Sabzavotlar (Barcha turlar)', 'yield': 'Yuqori', 'suitability': 5},
            {'name': 'Bug\'doy', 'yield': '5.5-7.0 t/ga', 'suitability': 5},
            {'name': 'Makkajo\'xori', 'yield': '7.0-9.0 t/ga', 'suitability': 5},
            {'name': 'Qovunlar', 'yield': '35-40 t/ga', 'suitability': 5},
            {'name': 'Mevali Daraxtlar', 'yield': 'A\'lo', 'suitability': 5}
        ],
        'management_tips': [
            'Eng yaxshi tuproq turi - minimal o\'zgartirish kerak',
            'Ekin almashtirishga e\'tibor bering',
            'Bahorda suv toshishga e\'tibor bering',
            'Organik dehqonchilik uchun ideal'
        ],
        'salinity_risk': 'Kam'
    },
    'solonchak': {
        'description': 'Yuqori sho\'r tuproq, tiklanish talab etadi',
        'ph_range': '8.5-10.0',
        'typical_organic_matter': '0.5-1.0%',
        'water_retention': 'O\'zgaruvchan',
        'common_issues': ['Yuqori sho\'rlanish', 'Oq tuz qobig\'i', 'Yomon o\'simlik o\'sishi', 'Zaharlilik'],
        'npk_status': {
            'nitrogen': 'Kam',
            'phosphorus': 'Kam',
            'potassium': 'Yuqori (lekin foydalanib bo\'lmaydigan)'
        },
        'fertilizer_recommendation': {
            'nitrogen': 'Yuvishdan keyin: 100 kg/ga karbamid qo\'shing',
            'phosphorus': 'Yuvishdan keyin: 80 kg/ga superfosfat qo\'shing',
            'potassium': 'Kerak emas (allaqachon tuzlarda yuqori)'
        },
        'top_crops': [
            {'name': 'Arpa (tuzga chidamli)', 'yield': '2.5-3.5 t/ga', 'suitability': 3},
            {'name': 'Qand lavlagi', 'yield': '30-40 t/ga', 'suitability': 3},
            {'name': 'Kungaboqar', 'yield': '1.5-2.0 t/ga', 'suitability': 3},
            {'name': 'Galofit o\'simliklar (yem uchun)', 'yield': 'O\'zgaruvchan', 'suitability': 4}
        ],
        'management_tips': [
            '⚠️ MUHIM: Ekishdan oldin 2000-3000 m³/ga suv bilan tuzlarni yuving',
            'Natriyni almashtirish uchun gips (3-5 t/ga) qo\'shing',
            'Sho\'r suvni olib tashlash uchun drenaj o\'rnating',
            'Dastlab tuzga chidamli ekinlar yetishtiring',
            'Dastlabki yuvishdan keyin organik modda qo\'shing',
            'Ko\'p yillik tiklanish rejasini ko\'rib chiqing'
        ],
        'salinity_risk': 'Juda yuqori'
    }
}


def get_recommendations(soil_type, confidence):
    """
    Tuproq turiga asoslangan to'liq tavsiyalar yaratish
    
    Args:
        soil_type: Tasniflangan tuproq turi
        confidence: Model ishonchi (0-1)
    
    Returns:
        dict: To'liq tavsiyalar
    """
    soil_info = SOIL_DATABASE.get(soil_type.lower(), SOIL_DATABASE['serozem'])
    
    # Ishonchga qarab tavsiyalarni sozlash
    confidence_note = ""
    if confidence < 0.7:
        confidence_note = "⚠️ Ishonch past - tasdiqlash uchun laboratoriya testini ko'rib chiqing."
    elif confidence < 0.85:
        confidence_note = "O'rta ishonch - tavsiyalar umumiy yo'riqnoma."
    else:
        confidence_note = "Yuqori ishonch - tavsiyalar ishonchli."
    
    return {
        'soil_type': soil_type,
        'confidence': confidence,
        'confidence_note': confidence_note,
        'description': soil_info['description'],
        'characteristics': {
            'ph_range': soil_info['ph_range'],
            'organic_matter': soil_info['typical_organic_matter'],
            'water_retention': soil_info['water_retention'],
            'salinity_risk': soil_info['salinity_risk']
        },
        'common_issues': soil_info['common_issues'],
        'npk_analysis': soil_info['npk_status'],
        'fertilizer_advice': soil_info['fertilizer_recommendation'],
        'crop_recommendations': soil_info['top_crops'],
        'management_tips': soil_info['management_tips']
    }


def generate_advice_text(recommendations):
    """Odam o'qiy oladigan maslahat matni yaratish"""
    advice = f"""
TUPROQ TAHLILI NATIJALARI

Tuproq Turi: {recommendations['soil_type'].upper()}
Ishonch: {recommendations['confidence']:.1%}
{recommendations['confidence_note']}

TA'RIF:
{recommendations['description']}

ASOSIY XUSUSIYATLAR:
- pH Oralig'i: {recommendations['characteristics']['ph_range']}
- Organik Modda: {recommendations['characteristics']['organic_matter']}
- Suv Ushlab Turish: {recommendations['characteristics']['water_retention']}
- Sho'rlanish Xavfi: {recommendations['characteristics']['salinity_risk']}

KENG TARQALGAN MUAMMOLAR:
{chr(10).join('• ' + issue for issue in recommendations['common_issues'])}

NPK HOLATI:
- Azot (N): {recommendations['npk_analysis']['nitrogen']}
- Fosfor (P): {recommendations['npk_analysis']['phosphorus']}
- Kaliy (K): {recommendations['npk_analysis']['potassium']}

O'G'IT TAVSIYALARI:
- N: {recommendations['fertilizer_advice']['nitrogen']}
- P: {recommendations['fertilizer_advice']['phosphorus']}
- K: {recommendations['fertilizer_advice']['potassium']}

ENG TAVSIYA ETILADIGAN EKINLAR:
{chr(10).join(f"{i+1}. {crop['name']} - Hosildorlik: {crop['yield']} (Moslik: {'★' * crop['suitability']})" 
              for i, crop in enumerate(recommendations['crop_recommendations'][:5]))}

BOSHQARUV MASLAHATLARI:
{chr(10).join('• ' + tip for tip in recommendations['management_tips'])}
"""
    return advice.strip()