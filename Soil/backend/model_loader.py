import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import numpy as np

class SoilClassifier(nn.Module):
    """Same architecture as training"""
    def __init__(self, num_classes=5):
        super(SoilClassifier, self).__init__()
        self.backbone = models.mobilenet_v2(pretrained=False)
        in_features = self.backbone.classifier[1].in_features
        self.backbone.classifier = nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(in_features, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, num_classes)
        )
    
    def forward(self, x):
        return self.backbone(x)


class ModelInference:
    """Model wrapper for inference"""
    
    def __init__(self, model_path, class_names, device='cpu'):
        self.device = torch.device(device)
        self.class_names = class_names
        
        # Load model
        self.model = SoilClassifier(num_classes=len(class_names))
        checkpoint = torch.load(model_path, map_location=self.device)
        
        if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
            self.model.load_state_dict(checkpoint['model_state_dict'])
        else:
            self.model.load_state_dict(checkpoint)
        
        self.model.to(self.device)
        self.model.eval()
        
        # Transforms
        self.transform = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
        
        print(f"✓ Model loaded successfully on {self.device}")
        print(f"✓ Classes: {self.class_names}")
    
    def preprocess_image(self, image_path_or_pil):
        """Preprocess image for inference"""
        if isinstance(image_path_or_pil, str):
            image = Image.open(image_path_or_pil).convert('RGB')
        else:
            image = image_path_or_pil.convert('RGB')
        
        image_tensor = self.transform(image).unsqueeze(0)
        return image_tensor.to(self.device)
    
    def predict(self, image_path_or_pil):
        """
        Predict soil type
        
        Returns:
            dict: {
                'soil_type': str,
                'confidence': float,
                'all_probabilities': dict
            }
        """
        image_tensor = self.preprocess_image(image_path_or_pil)
        
        with torch.no_grad():
            outputs = self.model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
        
        predicted_class = self.class_names[predicted.item()]
        confidence_score = confidence.item()
        
        # Get all probabilities
        all_probs = {
            self.class_names[i]: float(probabilities[0][i])
            for i in range(len(self.class_names))
        }
        
        return {
            'soil_type': predicted_class,
            'confidence': confidence_score,
            'all_probabilities': all_probs
        }