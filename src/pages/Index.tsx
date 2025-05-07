
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    title: "Унаги Урамаки",
    description: "Рис, угорь, огурец, авокадо, соус унаги, кунжут",
    price: 399,
    weight: "240г",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop",
    category: "Роллы",
    isPopular: true
  },
  {
    id: 2,
    title: "Филадельфия",
    description: "Рис, лосось, сливочный сыр, огурец, авокадо",
    price: 459,
    weight: "280г",
    imageUrl: "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?q=80&w=500&auto=format&fit=crop",
    category: "Роллы",
    isPopular: true
  },
  {
    id: 3,
    title: "Калифорния",
    description: "Рис, краб, огурец, авокадо, тобико",
    price: 379,
    weight: "220г",
    imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=500&auto=format&fit=crop",
    category: "Роллы",
    isNew: true
  },
  {
    id: 4,
    title: "Мисо суп",
    description: "Суп на основе пасты мисо с водорослями, тофу и зеленым луком",
    price: 199,
    weight: "350мл",
    imageUrl: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?q=80&w=500&auto=format&fit=crop",
    category: "Супы"
  }
];

const categories = [
  { id: "all", name: "Все" },
  { id: "rolls", name: "Роллы" },
  { id: "sets", name: "Сеты" },
  { id: "soups", name: "Супы" },
  { id: "drinks", name: "Напитки" }
];

const Index = () => {
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-[#FF6633]">СушиМастер</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600">
              <Icon name="Phone" className="w-5 h-5 mr-2" />
              +7 (999) 123-45-67
            </Button>
            <Button variant="ghost" className="relative">
              <Icon name="ShoppingCart" className="w-6 h-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6633] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FF6633] to-[#FF8C66] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Доставка свежих роллов и суши</h1>
            <p className="text-xl mb-8">Быстрая доставка традиционной японской кухни из свежих ингредиентов</p>
            <div className="flex space-x-4">
              <Button className="bg-white text-[#FF6633] hover:bg-gray-100">Заказать сейчас</Button>
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
                  className={`rounded-full ${activeCategory === category.id ? "bg-[#FF6633]" : ""}`}
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Популярные блюда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                      onClick={() => addToCart(product.id)}
                      className="bg-[#FF6633] hover:bg-[#FF8C66]"
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F9F9F9] p-4 rounded-full mb-4">
                <Icon name="Clock" className="w-8 h-8 text-[#FF6633]" />
              </div>
              <h3 className="font-medium text-lg mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставляем заказы в течение 60 минут или бесплатно</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F9F9F9] p-4 rounded-full mb-4">
                <Icon name="ThumbsUp" className="w-8 h-8 text-[#FF6633]" />
              </div>
              <h3 className="font-medium text-lg mb-2">Качественные ингредиенты</h3>
              <p className="text-gray-600">Используем только свежие продукты от проверенных поставщиков</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F9F9F9] p-4 rounded-full mb-4">
                <Icon name="Gift" className="w-8 h-8 text-[#FF6633]" />
              </div>
              <h3 className="font-medium text-lg mb-2">Бонусная программа</h3>
              <p className="text-gray-600">Возвращаем 5% от суммы заказа бонусами на следующие покупки</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">СушиМастер</h3>
              <p className="text-gray-300 mb-4">Доставка японской кухни высшего качества</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-[#FF6633]">
                  <Icon name="Instagram" className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-[#FF6633]">
                  <Icon name="Facebook" className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-[#FF6633]">
                  <Icon name="Twitter" className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Информация</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">О нас</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Доставка и оплата</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Акции</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Контакты</h3>
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
                  info@sushimaster.ru
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>© 2025 СушиМастер. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
