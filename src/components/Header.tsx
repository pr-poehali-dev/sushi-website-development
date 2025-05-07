
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  cartItemsCount: number;
}

const Header = ({ cartItemsCount }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-[#FF6633]">СушиМастер</a>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-600">
            <Icon name="Phone" className="w-5 h-5 mr-2" />
            +7 (999) 123-45-67
          </Button>
          <Button variant="ghost" className="relative">
            <Icon name="ShoppingCart" className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6633] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex md:hidden items-center space-x-4">
          <Button variant="ghost" className="relative">
            <Icon name="ShoppingCart" className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6633] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon name="Menu" className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col py-4 gap-4">
                <a href="/" className="text-xl font-bold text-[#FF6633]">СушиМастер</a>
                <nav className="flex flex-col gap-2">
                  <a href="#" className="py-2 px-4 hover:bg-gray-100 rounded-md">Меню</a>
                  <a href="#" className="py-2 px-4 hover:bg-gray-100 rounded-md">Акции</a>
                  <a href="#" className="py-2 px-4 hover:bg-gray-100 rounded-md">Доставка</a>
                  <a href="#" className="py-2 px-4 hover:bg-gray-100 rounded-md">О нас</a>
                  <a href="#" className="py-2 px-4 hover:bg-gray-100 rounded-md">Контакты</a>
                </nav>
                <div className="mt-auto pt-4 border-t">
                  <Button variant="ghost" className="w-full justify-start text-gray-600">
                    <Icon name="Phone" className="w-5 h-5 mr-2" />
                    +7 (999) 123-45-67
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
