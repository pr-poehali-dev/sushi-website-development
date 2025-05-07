
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
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
            onClick={onCartClick}
          >
            <Icon name="ShoppingCart" className="w-5 h-5 mr-2" />
            Корзина
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F2353D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
