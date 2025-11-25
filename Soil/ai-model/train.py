import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models
from tqdm import tqdm
import json
from datetime import datetime
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix

from dataset import create_dataloaders

class SoilClassifier(nn.Module):
    """
    MobileNetV2 asosidagi tuproq tasniflagich
    Yengil va mobil qurilmalarga mos
    """
    def __init__(self, num_classes=5, pretrained=True):
        super(SoilClassifier, self).__init__()
        
        # Oldindan o'qitilgan MobileNetV2 ni yuklash
        self.backbone = models.mobilenet_v2(pretrained=pretrained)
        
        # Classifier qismini almashtirish
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


class EarlyStopping:
    """Ortiqcha o'qitilishning oldini olish uchun erta to'xtatish"""
    def __init__(self, patience=7, min_delta=0.001):
        self.patience = patience
        self.min_delta = min_delta
        self.counter = 0
        self.best_loss = None
        self.early_stop = False
        
    def __call__(self, val_loss):
        if self.best_loss is None:
            self.best_loss = val_loss
        elif val_loss > self.best_loss - self.min_delta:
            self.counter += 1
            if self.counter >= self.patience:
                self.early_stop = True
        else:
            self.best_loss = val_loss
            self.counter = 0


def train_one_epoch(model, train_loader, criterion, optimizer, device, epoch):
    """Bir epoch uchun o'qitish"""
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    
    pbar = tqdm(train_loader, desc=f'Epoch {epoch} [O\'qitish]')
    for images, labels in pbar:
        images, labels = images.to(device), labels.to(device)
        
        # Oldinga o'tish
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        
        # Orqaga o'tish
        loss.backward()
        optimizer.step()
        
        # Statistika
        running_loss += loss.item()
        _, predicted = outputs.max(1)
        total += labels.size(0)
        correct += predicted.eq(labels).sum().item()
        
        # Progress bar'ni yangilash
        pbar.set_postfix({
            'loss': f'{running_loss / (pbar.n + 1):.4f}',
            'aniqlik': f'{100. * correct / total:.2f}%'
        })
    
    epoch_loss = running_loss / len(train_loader)
    epoch_acc = 100. * correct / total
    
    return epoch_loss, epoch_acc


def validate(model, val_loader, criterion, device, epoch):
    """Modelni tekshirish"""
    model.eval()
    running_loss = 0.0
    correct = 0
    total = 0
    
    all_preds = []
    all_labels = []
    
    with torch.no_grad():
        pbar = tqdm(val_loader, desc=f'Epoch {epoch} [Tekshiruv]')
        for images, labels in pbar:
            images, labels = images.to(device), labels.to(device)
            
            outputs = model(images)
            loss = criterion(outputs, labels)
            
            running_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()
            
            all_preds.extend(predicted.cpu().numpy())
            all_labels.extend(labels.cpu().numpy())
            
            pbar.set_postfix({
                'loss': f'{running_loss / (pbar.n + 1):.4f}',
                'aniqlik': f'{100. * correct / total:.2f}%'
            })
    
    epoch_loss = running_loss / len(val_loader)
    epoch_acc = 100. * correct / total
    
    return epoch_loss, epoch_acc, all_preds, all_labels


def train_model(
    data_dir='./data',
    num_epochs=50,
    batch_size=32,
    learning_rate=0.001,
    device='cuda',
    save_dir='./checkpoints'
):
    """
    Asosiy o'qitish funksiyasi
    """
    # Saqlash papkasini yaratish
    os.makedirs(save_dir, exist_ok=True)
    
    # Qurilmani sozlash
    device = torch.device(device if torch.cuda.is_available() else 'cpu')
    print(f"Qurilma: {device}")
    
    # Dataloader'larni yaratish
    train_loader, val_loader, class_names = create_dataloaders(
        data_dir=data_dir,
        batch_size=batch_size,
        num_workers=4
    )
    
    num_classes = len(class_names)
    print(f"\n{num_classes} ta sinf bilan o'qitish: {class_names}")
    
    # Modelni yaratish
    model = SoilClassifier(num_classes=num_classes, pretrained=True)
    model = model.to(device)
    
    # Loss va optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', factor=0.5, patience=5, verbose=True
    )
    
    # Erta to'xtatish
    early_stopping = EarlyStopping(patience=10)
    
    # O'qitish tarixi
    history = {
        'train_loss': [],
        'train_acc': [],
        'val_loss': [],
        'val_acc': [],
        'class_names': class_names
    }
    
    best_val_acc = 0.0
    
    # O'qitish sikli
    print("\n" + "="*60)
    print("O'qitish Boshlandi")
    print("="*60)
    
    for epoch in range(1, num_epochs + 1):
        print(f"\nEpoch {epoch}/{num_epochs}")
        print("-" * 40)
        
        # O'qitish
        train_loss, train_acc = train_one_epoch(
            model, train_loader, criterion, optimizer, device, epoch
        )
        
        # Tekshirish
        val_loss, val_acc, val_preds, val_labels = validate(
            model, val_loader, criterion, device, epoch
        )
        
        # Learning rate'ni yangilash
        scheduler.step(val_loss)
        
        # Tarixni saqlash
        history['train_loss'].append(train_loss)
        history['train_acc'].append(train_acc)
        history['val_loss'].append(val_loss)
        history['val_acc'].append(val_acc)
        
        print(f"\nEpoch {epoch} Xulosa:")
        print(f"  O'qitish Loss: {train_loss:.4f} | O'qitish Aniqlik: {train_acc:.2f}%")
        print(f"  Tekshiruv Loss: {val_loss:.4f} | Tekshiruv Aniqlik: {val_acc:.2f}%")
        
        # Eng yaxshi modelni saqlash
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            checkpoint = {
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'val_acc': val_acc,
                'val_loss': val_loss,
                'class_names': class_names
            }
            torch.save(checkpoint, os.path.join(save_dir, 'soil_classifier_best.pt'))
            torch.save(model.state_dict(), os.path.join(save_dir, 'soil_classifier.pt'))
            print(f"  ✓ Eng yaxshi model saqlandi (Tekshiruv Aniqlik: {val_acc:.2f}%)")
        
        # Erta to'xtatishni tekshirish
        early_stopping(val_loss)
        if early_stopping.early_stop:
            print(f"\nErta to'xtatish {epoch}-epoch'da ishga tushdi")
            break
    
    # Yakuniy modelni saqlash
    torch.save(model.state_dict(), os.path.join(save_dir, 'soil_classifier_final.pt'))
    
    # O'qitish tarixini saqlash
    with open(os.path.join(save_dir, 'training_history.json'), 'w') as f:
        json.dump(history, f, indent=2)
    
    # Eng yaxshi model bo'yicha hisobot yaratish
    print("\n" + "="*60)
    print("O'qitish Yakunlandi!")
    print("="*60)
    print(f"Eng Yaxshi Tekshiruv Aniqligi: {best_val_acc:.2f}%")
    
    # Yakuniy baholash uchun eng yaxshi modelni yuklash
    checkpoint = torch.load(os.path.join(save_dir, 'soil_classifier_best.pt'))
    model.load_state_dict(checkpoint['model_state_dict'])
    
    _, _, val_preds, val_labels = validate(model, val_loader, criterion, device, 'Yakuniy')
    
    print("\nTasnif Hisoboti:")
    print(classification_report(val_labels, val_preds, target_names=class_names))
    
    return model, history


if __name__ == "__main__":
    """
    APPARAT TALABLARI:
    - GPU: NVIDIA GTX 1060 (6GB) yoki undan yaxshiroq (tavsiya etiladi)
    - CPU: Intel i5 yoki ekvivalenti (sekinroq ishlaydi)
    - RAM: Minimal 8GB, 16GB tavsiya etiladi
    - Xotira: Dataset va modellar uchun 10GB
    
    DATASET YIG'ISH:
    1. Papkalar yarating: data/train/<sinf_nomi>/ va data/val/<sinf_nomi>/
    2. Smartphone yordamida tuproq rasmlarini oling:
       - Masofa: Tuproq yuzasidan 30-50cm
       - Ruxsatnoma: 1080p yoki undan yuqori
       - Yoritish: Tabiiy kunduzi yorug'lik (qattiq soyalardan saqlaning)
       - Tuproq yuzasini tozalang (o'simlik/chiqindilarni olib tashlang)
       - Bir nechta burchak: Bir joy uchun 3-5 ta rasm
    3. Har bir sinf uchun minimum:
       - O'qitish: 200-500 ta rasm
       - Tekshiruv: 50-100 ta rasm
    4. 80/20 o'qitish/tekshiruv nisbatini saqlang
    """
    
    # Modelni o'qitish
    model, history = train_model(
        data_dir='./data',
        num_epochs=50,
        batch_size=32,
        learning_rate=0.001,
        device='cuda',  # GPU bo'lmasa 'cpu' ishlatilsin
        save_dir='./checkpoints'
    )
    
    print("\n✓ Model o'qitish tugallandi!")
    print("✓ Eng yaxshi model saqlandi: ./checkpoints/soil_classifier_best.pt")
    print("✓ Yakuniy model saqlandi: ./checkpoints/soil_classifier_final.pt")