
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: string;
  imageUrl: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
}

interface MenuCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
}

const MenuCard = ({ product, onAddToCart }: MenuCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {product.isPopular && (
            <Badge className="bg-[#FF6633]">Популярное</Badge>
          )}
          {product.isNew && (
            <Badge className="bg-[#4CAF50]">Новинка</Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{product.title}</h3>
          <span className="text-sm text-gray-500">{product.weight}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">{product.price} ₽</span>
          <Button 
            onClick={() => onAddToCart(product.id)}
            className="bg-[#FF6633] hover:bg-[#FF8C66]"
            size="sm"
          >
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
