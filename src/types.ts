export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'main' | 'appetizer' | 'dessert' | 'beverage';
}

export interface CartItem extends MenuItem {
  quantity: number;
}