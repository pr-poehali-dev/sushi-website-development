
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: string;
  imageUrl: string;
  category: string;
  quantity: number;
}

interface CartDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  totalAmount: number;
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
  onClearCart: () => void;
}

const CartDialog = ({
  isOpen,
  onOpenChange,
  cart,
  totalAmount,
  onAddToCart,
  onRemoveFromCart,
  onClearCart
}: CartDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-auto">
        <div className="py-4">
          <h2 className="text-2xl font-bold mb-4">Корзина</h2>
          
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
              <Button 
                onClick={() => onOpenChange(false)}
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
                        onClick={() => onRemoveFromCart(item.id)} 
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#F2353D]"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button 
                        onClick={() => onAddToCart(item.id)} 
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
                  onClick={onClearCart}
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
  );
};

export default CartDialog;
