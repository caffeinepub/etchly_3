import { useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  selectedMaterial: string;
  materialPrice: number;
  engravingText: string;
  quantity: number;
  imageUrl: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.productId === item.productId && i.selectedMaterial === item.selectedMaterial
      );
      if (existing) {
        return prev.map(i =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, id: `${Date.now()}`, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.materialPrice * item.quantity, 0);

  return { items, subtotal, isOpen, setIsOpen, addItem, removeItem, clearCart };
}
