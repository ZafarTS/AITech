import os
import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image
import numpy as np

class SoilDataset(Dataset):
    """
    Tuproq rasmlari uchun maxsus Dataset klassi
    
    Papka strukturasi:
    data/
      train/                    # O'quv ma'lumotlari
        serozem/               # Kulrang tuproq
          img001.jpg
          img002.jpg
        meadow/                # Yaylov tuproqi
          ...
      val/                     # Tekshiruv ma'lumotlari
        serozem/
        meadow/
        ...
    """
    
    def __init__(self, root_dir, transform=None):
        """
        Args:
            root_dir (str): train/ yoki val/ papkasiga yo'l
            transform: torchvision transformatsiyalari
        """
        self.root_dir = root_dir
        self.transform = transform
        self.classes = sorted(os.listdir(root_dir))
        self.class_to_idx = {cls: idx for idx, cls in enumerate(self.classes)}
        
        # Fayllar ro'yxatini yaratish
        self.samples = []
        for class_name in self.classes:
            class_dir = os.path.join(root_dir, class_name)
            if not os.path.isdir(class_dir):
                continue
            
            for img_name in os.listdir(class_dir):
                if img_name.lower().endswith(('.jpg', '.jpeg', '.png')):
                    img_path = os.path.join(class_dir, img_name)
                    self.samples.append((img_path, self.class_to_idx[class_name]))
        
        print(f"{len(self.samples)} ta rasm yuklandi, {len(self.classes)} ta sinfdan")
        print(f"Sinflar: {self.classes}")
    
    def __len__(self):
        return len(self.samples)
    
    def __getitem__(self, idx):
        img_path, label = self.samples[idx]
        
        # Rasmni yuklash
        image = Image.open(img_path).convert('RGB')
        
        # Transformatsiyalarni qo'llash
        if self.transform:
            image = self.transform(image)
        
        return image, label


def get_transforms(is_training=True):
    """
    O'qitish yoki tekshirish uchun tegishli transformatsiyalarni qaytaradi
    """
    if is_training:
        return transforms.Compose([
            transforms.RandomResizedCrop(224, scale=(0.8, 1.0)),
            transforms.RandomHorizontalFlip(p=0.5),
            transforms.RandomVerticalFlip(p=0.3),
            transforms.RandomRotation(degrees=15),
            transforms.ColorJitter(
                brightness=0.3,      # Yorug'likni o'zgartirish
                contrast=0.3,        # Kontrastni o'zgartirish
                saturation=0.2,      # To'yinganlikni o'zgartirish
                hue=0.1             # Rangni o'zgartirish
            ),
            transforms.RandomAdjustSharpness(sharpness_factor=2, p=0.3),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],  # ImageNet standartlari
                std=[0.229, 0.224, 0.225]
            )
        ])
    else:
        return transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])


def create_dataloaders(data_dir, batch_size=32, num_workers=4):
    """
    O'qitish va tekshirish dataloader'larini yaratadi
    
    Args:
        data_dir: data/ papkasiga yo'l (train/ va val/ o'z ichiga oladi)
        batch_size: O'qitish uchun batch hajmi
        num_workers: Ma'lumotlarni yuklash uchun worker'lar soni
    
    Returns:
        train_loader, val_loader, sinf nomlari
    """
    train_dir = os.path.join(data_dir, 'train')
    val_dir = os.path.join(data_dir, 'val')
    
    # Dataset'larni yaratish
    train_dataset = SoilDataset(
        train_dir,
        transform=get_transforms(is_training=True)
    )
    
    val_dataset = SoilDataset(
        val_dir,
        transform=get_transforms(is_training=False)
    )
    
    # Dataloader'larni yaratish
    train_loader = DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
        num_workers=num_workers,
        pin_memory=True
    )
    
    val_loader = DataLoader(
        val_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=num_workers,
        pin_memory=True
    )
    
    return train_loader, val_loader, train_dataset.classes


if __name__ == "__main__":
    # Dataset'ni test qilish
    train_loader, val_loader, classes = create_dataloaders(
        data_dir='./data',
        batch_size=16
    )
    
    print(f"\nDataset Statistikasi:")
    print(f"O'qitish batch'lari: {len(train_loader)}")
    print(f"Tekshiruv batch'lari: {len(val_loader)}")
    print(f"Sinflar: {classes}")
    
    # Bitta batch'ni test qilish
    images, labels = next(iter(train_loader))
    print(f"\nBatch shakli: {images.shape}")
    print(f"Label'lar shakli: {labels.shape}")