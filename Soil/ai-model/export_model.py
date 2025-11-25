import torch
import torch.onnx
from train import SoilClassifier
import json

def export_to_onnx(model_path, output_path, num_classes=5):
    """PyTorch modelini ONNX formatiga eksport qilish"""
    
    # Modelni yuklash
    model = SoilClassifier(num_classes=num_classes, pretrained=False)
    checkpoint = torch.load(model_path, map_location='cpu')
    
    if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
        model.load_state_dict(checkpoint['model_state_dict'])
    else:
        model.load_state_dict(checkpoint)
    
    model.eval()
    
    # Test uchun dummy input
    dummy_input = torch.randn(1, 3, 224, 224)
    
    # Eksport
    torch.onnx.export(
        model,
        dummy_input,
        output_path,
        export_params=True,
        opset_version=11,
        do_constant_folding=True,
        input_names=['input'],
        output_names=['output'],
        dynamic_axes={
            'input': {0: 'batch_size'},
            'output': {0: 'batch_size'}
        }
    )
    
    print(f"✓ Model ONNX formatida eksport qilindi: {output_path}")


def export_to_torchscript(model_path, output_path, num_classes=5):
    """PyTorch modelini TorchScript formatiga eksport qilish"""
    
    # Modelni yuklash
    model = SoilClassifier(num_classes=num_classes, pretrained=False)
    checkpoint = torch.load(model_path, map_location='cpu')
    
    if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
        model.load_state_dict(checkpoint['model_state_dict'])
    else:
        model.load_state_dict(checkpoint)
    
    model.eval()
    
    # Modelni trace qilish
    dummy_input = torch.randn(1, 3, 224, 224)
    traced_model = torch.jit.trace(model, dummy_input)
    
    # Saqlash
    traced_model.save(output_path)
    
    print(f"✓ Model TorchScript formatida eksport qilindi: {output_path}")


if __name__ == "__main__":
    model_path = './checkpoints/soil_classifier_best.pt'
    
    # ONNX ga eksport
    export_to_onnx(
        model_path=model_path,
        output_path='./checkpoints/soil_classifier.onnx',
        num_classes=5
    )
    
    # TorchScript ga eksport
    export_to_torchscript(
        model_path=model_path,
        output_path='./checkpoints/soil_classifier.torchscript',
        num_classes=5
    )
    
    print("\n✓ Barcha eksportlar muvaffaqiyatli yakunlandi!")