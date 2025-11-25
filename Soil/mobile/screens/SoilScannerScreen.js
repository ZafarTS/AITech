import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Linking,
} from 'react-native';
import {
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Chip,
  Divider,
  List,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { analyzeSoil, getPDFUrl } from '../services/api';

export default function SoilScannerScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Kamera ruxsatlarini so'rash
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Ruxsat Kerak',
        'Tuproq rasmlarini olish uchun kamera ruxsati kerak.'
      );
      return false;
    }
    return true;
  };

  // Rasm olish
  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setResults(null); // Oldingi natijalarni tozalash
      }
    } catch (error) {
      Alert.alert('Xato', 'Rasm olishda xatolik');
      console.error(error);
    }
  };

  // Galereyadan tanlash
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setResults(null);
      }
    } catch (error) {
      Alert.alert('Xato', 'Rasm tanlashda xatolik');
      console.error(error);
    }
  };

  // Tuproqni tahlil qilish
  const handleAnalyze = async () => {
    if (!image) {
      Alert.alert('Rasm Yo\'q', 'Iltimos, avval tuproq rasmini oling yoki tanlang');
      return;
    }

    setLoading(true);
    try {
      const analysisResults = await analyzeSoil(image);
      setResults(analysisResults);
    } catch (error) {
      Alert.alert(
        'Tahlil Muvaffaqiyatsiz',
        error.response?.data?.detail || 'Iltimos, ulanishni tekshiring va qayta urinib ko\'ring'
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // PDF yuklab olish
  const downloadPDF = () => {
    if (results?.soil_passport_pdf_url) {
      const pdfUrl = getPDFUrl(results.soil_passport_pdf_url);
      Linking.openURL(pdfUrl);
    }
  };

  // Qayta boshlash
  const reset = () => {
    setImage(null);
    setResults(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Sarlavha */}
      <View style={styles.header}>
        <Title style={styles.headerTitle}>🌱 Tuproq Skaneri</Title>
        <Paragraph style={styles.headerSubtitle}>
          AI Asosidagi Tuproq Tahlili
        </Paragraph>
      </View>

      {/* Rasm Ko'rinishi */}
      {image && (
        <Card style={styles.imageCard}>
          <Card.Cover source={{ uri: image }} style={styles.imagePreview} />
        </Card>
      )}

      {/* Amal Tugmalari */}
      {!results && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon="camera"
            onPress={takePhoto}
            style={styles.button}
            buttonColor="#2E7D32"
          >
            Rasm Olish
          </Button>
          <Button
            mode="outlined"
            icon="image"
            onPress={pickImage}
            style={styles.button}
            textColor="#2E7D32"
          >
            Galereyadan Tanlash
          </Button>
          {image && (
            <Button
              mode="contained"
              icon="microscope"
              onPress={handleAnalyze}
              style={[styles.button, styles.analyzeButton]}
              buttonColor="#FFA726"
              loading={loading}
              disabled={loading}
            >
              Tuproqni Tahlil Qilish
            </Button>
          )}
        </View>
      )}

      {/* Yuklanish Indikatori */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Paragraph style={styles.loadingText}>
            Tuproq tarkibini tahlil qilmoqda...
          </Paragraph>
        </View>
      )}

      {/* Natijalar */}
      {results && !loading && (
        <View style={styles.resultsContainer}>
          {/* Tuproq Turi Kartasi */}
          <Card style={styles.resultCard}>
            <Card.Content>
              <Title style={styles.resultTitle}>Tuproq Tasnifi</Title>
              <View style={styles.soilTypeContainer}>
                <Chip
                  icon="check-circle"
                  style={styles.soilTypeChip}
                  textStyle={styles.soilTypeText}
                >
                  {results.soil_type.toUpperCase()}
                </Chip>
                <Paragraph style={styles.confidence}>
                  Ishonch: {(results.confidence * 100).toFixed(1)}%
                </Paragraph>
              </View>
              <Paragraph style={styles.description}>
                {results.description}
              </Paragraph>
            </Card.Content>
          </Card>

          {/* Xususiyatlar Kartasi */}
          <Card style={styles.resultCard}>
            <Card.Content>
              <Title style={styles.resultTitle}>Xususiyatlar</Title>
              <List.Item
                title="pH Oralig'i"
                description={results.characteristics.ph_range}
                left={(props) => <List.Icon {...props} icon="water" />}
              />
              <List.Item
                title="Organik Modda"
                description={results.characteristics.organic_matter}
                left={(props) => <List.Icon {...props} icon="leaf" />}
              />
              <List.Item
                title="Sho'rlanish Xavfi"
                description={results.characteristics.salinity_risk}
                left={(props) => <List.Icon {...props} icon="alert-circle" />}
              />
            </Card.Content>
          </Card>

          {/* NPK Tahlili Kartasi */}
          <Card style={styles.resultCard}>
            <Card.Content>
              <Title style={styles.resultTitle}>NPK Tahlili</Title>
              <List.Item
                title="Azot (N)"
                description={results.npk_analysis.nitrogen}
                left={(props) => <List.Icon {...props} icon="alpha-n-circle" />}
              />
              <List.Item
                title="Fosfor (P)"
                description={results.npk_analysis.phosphorus}
                left={(props) => <List.Icon {...props} icon="alpha-p-circle" />}
              />
              <List.Item
                title="Kaliy (K)"
                description={results.npk_analysis.potassium}
                left={(props) => <List.Icon {...props} icon="alpha-k-circle" />}
              />
            </Card.Content>
          </Card>

          {/* Ekin Tavsiyalari */}
          <Card style={styles.resultCard}>
            <Card.Content>
              <Title style={styles.resultTitle}>Tavsiya Etiladigan Ekinlar</Title>
              {results.crop_recommendations.slice(0, 5).map((crop, index) => (
                <View key={index} style={styles.cropItem}>
                  <Paragraph style={styles.cropName}>
                    {index + 1}. {crop.name}
                  </Paragraph>
                  <Paragraph style={styles.cropDetails}>
                    Hosildorlik: {crop.yield} | {'⭐'.repeat(crop.suitability)}
                  </Paragraph>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Boshqaruv Maslahatlari */}
          <Card style={styles.resultCard}>
            <Card.Content>
              <Title style={styles.resultTitle}>Boshqaruv Maslahatlari</Title>
              {results.management_tips.map((tip, index) => (
                <Paragraph key={index} style={styles.tip}>
                  • {tip}
                </Paragraph>
              ))}
            </Card.Content>
          </Card>

          {/* Amal Tugmalari */}
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              icon="file-pdf-box"
              onPress={downloadPDF}
              style={styles.button}
              buttonColor="#D32F2F"
            >
              Tuproq Pasportini Yuklab Olish (PDF)
            </Button>
            <Button
              mode="outlined"
              icon="restart"
              onPress={reset}
              style={styles.button}
              textColor="#2E7D32"
            >
              Boshqa Namunani Tahlil Qilish
            </Button>
          </View>
        </View>
      )}

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  imageCard: {
    margin: 16,
    elevation: 4,
  },
  imagePreview: {
    height: 250,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    marginVertical: 8,
  },
  analyzeButton: {
    marginTop: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  resultsContainer: {
    padding: 16,
  },
  resultCard: {
    marginBottom: 16,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    color: '#2E7D32',
    marginBottom: 8,
  },
  soilTypeContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  soilTypeChip: {
    backgroundColor: '#4CAF50',
  },
  soilTypeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confidence: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  description: {
    marginTop: 12,
    lineHeight: 20,
  },
  cropItem: {
    marginVertical: 6,
  },
  cropName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cropDetails: {
    fontSize: 12,
    color: '#666',
  },
  tip: {
    marginVertical: 4,
    lineHeight: 20,
  },
  actionButtons: {
    marginTop: 8,
  },
  footer: {
    height: 20,
  },
});