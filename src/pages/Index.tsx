
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

// Определение типов
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

interface CartItem extends Product {
  quantity: number;
}

// Данные продуктов
const products: Product[] = [
  {
    id: 1,
    title: "Филадельфия",
    description: "Лосось, сыр сливочный, огурец, авокадо",
    price: 219,
    weight: "240 г",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop",
    category: "Роллы",
    isPopular: true
  },
  {
    id: 2,
    title: "Калифорния",
    description: "Краб, авокадо, огурец, майонез, тобико",
    price: 199,
    weight: "210 г",
    imageUrl: "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?q=80&w=600&auto=format&fit=crop",
    category: "Роллы"
  },
  {
    id: 3,
    title: "Суши с креветкой",
    description: "Рис и креветка",
    price: 95,
    weight: "35 г",
    imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=600&auto=format&fit=crop",
    category: "Суши"
  },
  {
    id: 4,
    title: "Дракон",
    description: "Угорь, огурец, сыр сливочный, авокадо, соус унаги",
    price: 239,
    weight: "235 г",
    imageUrl: "https://images.unsplash.com/photo-1635812211604-53e9437d21c1?q=80&w=600&auto=format&fit=crop",
    category: "Роллы",
    isNew: true
  },
  {
    id: 5,
    title: "Горячая Филадельфия",
    description: "Лосось, сыр сливочный, огурец, соус спайси, кляр, панировка",
    price: 225,
    weight: "250 г",
    imageUrl: "https://images.unsplash.com/photo-1633478062482-940b8713f3bc?q=80&w=600&auto=format&fit=crop",
    category: "Горячие роллы",
    isPopular: true
  },
  {
    id: 6,
    title: "Суши с лососем",
    description: "Рис и лосось",
    price: 99,
    weight: "35 г",
    imageUrl: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=600&auto=format&fit=crop",
    category: "Суши"
  },
  {
    id: 7,
    title: "Унаги маки",
    description: "Угорь, огурец, соус унаги",
    price: 189,
    weight: "190 г",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop",
    category: "Роллы"
  },
  {
    id: 8,
    title: "Сет Филадельфия",
    description: "Филадельфия с лососем, с креветкой, с угрем",
    price: 599,
    weight: "720 г",
    imageUrl: "https://images.unsplash.com/photo-1625864667534-aa5208d45a15?q=80&w=600&auto=format&fit=crop",
    category: "Сеты",
    isNew: true
  }
];

// Категории
const categories = [
  { id: "all", name: "Все меню" },
  { id: "rolls", name: "Роллы" },
  { id: "hot-rolls", name: "Горячие роллы" },
  { id: "sushi", name: "Суши" },
  { id: "sets", name: "Сеты" },
  { id: "drinks", name: "Напитки" }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Подсчет общей суммы при изменении корзины
    const amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(amount);
  }, [cart]);

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => {
        const category = product.category.toLowerCase();
        if (activeCategory === 'rolls') return category === 'роллы';
        if (activeCategory === 'hot-rolls') return category === 'горячие роллы';
        if (activeCategory === 'sushi') return category === 'суши';
        if (activeCategory === 'sets') return category === 'сеты';
        if (activeCategory === 'drinks') return category === 'напитки';
        return false;
      });

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-extrabold text-[#F2353D]">
              СУШИ-МАСТЕР
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-[#F2353D] text-[#F2353D] hover:bg-[#F2353D] hover:text-white">
              Доставка
            </Button>
            <Button 
              variant="outline" 
              className="relative border-[#F2353D] text-[#F2353D] hover:bg-[#F2353D] hover:text-white"
              onClick={() => setIsCartOpen(true)}
            >
              <Icon name="ShoppingCart" className="w-5 h-5 mr-2" />
              Корзина
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F2353D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#F2353D] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Японская кухня <br />с бесплатной доставкой</h1>
            <p className="text-lg mb-6">Вкусные суши и роллы, приготовленные <br />по традиционным рецептам</p>
            <div className="flex space-x-4">
              <Button className="bg-white text-[#F2353D] hover:bg-gray-100">
                Заказать онлайн
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Смотреть меню
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2">
              {categories.map(category => (
                <Button 
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`rounded-md ${activeCategory === category.id ? "bg-[#F2353D] text-white" : "border-[#F2353D] text-[#F2353D] hover:bg-[#F2353D] hover:text-white"}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Популярные блюда</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    {product.isPopular && (
                      <Badge className="bg-[#F2353D]">Хит продаж</Badge>
                    )}
                    {product.isNew && (
                      <Badge className="bg-[#3DAA35]">Новинка</Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <span className="text-sm text-gray-500">{product.weight}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{product.price} ₽</span>
                    <Button 
                      onClick={() => addToCart(product.id)}
                      className="bg-[#F2353D] hover:bg-[#d92e36] text-white"
                      size="sm"
                    >
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F2353D] p-4 rounded-full mb-4 text-white">
                <Icon name="Clock" className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставляем заказы в течение 60 минут по Москве</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F2353D] p-4 rounded-full mb-4 text-white">
                <Icon name="ThumbsUp" className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Свежие продукты</h3>
              <p className="text-gray-600">Используем только свежие ингредиенты от проверенных поставщиков</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F2353D] p-4 rounded-full mb-4 text-white">
                <Icon name="Gift" className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Бонусная программа</h3>
              <p className="text-gray-600">Возвращаем 5% от суммы заказа бонусами на следующие покупки</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E2E2E] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">СУШИ-МАСТЕР</h3>
              <p className="text-gray-300 mb-4">Доставка японской кухни высшего качества</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-[#F2353D]">
                  <Icon name="Instagram" className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-[#F2353D]">
                  <Icon name="Facebook" className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-[#F2353D]">
                  <Icon name="Twitter" className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Информация</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">О нас</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Доставка и оплата</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Акции</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Контакты</h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Icon name="MapPin" className="w-5 h-5 mr-2" />
                  г. Москва, ул. Суши, д. 1
                </p>
                <p className="flex items-center">
                  <Icon name="Phone" className="w-5 h-5 mr-2" />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center">
                  <Icon name="Mail" className="w-5 h-5 mr-2" />
                  info@sushi-master.ru
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>© 2025 СУШИ-МАСТЕР. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-auto">
          <div className="py-4">
            <h2 className="text-2xl font-bold mb-4">Корзина</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
                <Button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#F2353D] hover:bg-[#d92e36] text-white"
                >
                  Вернуться к меню
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.weight}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#F2353D]"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item.id)} 
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#F2353D]"
                        >
                          +
                        </button>
                        <span className="ml-4 font-bold">{item.price * item.quantity} ₽</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Итого:</span>
                  <span className="font-bold text-xl">{totalAmount} ₽</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button 
                    className="bg-[#F2353D] hover:bg-[#d92e36] text-white"
                  >
                    Оформить заказ
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="border-[#F2353D] text-[#F2353D] hover:bg-[#F2353D] hover:text-white"
                  >
                    Очистить корзину
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
