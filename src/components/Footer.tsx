
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
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
  );
};

export default Footer;
