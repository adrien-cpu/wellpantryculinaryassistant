
import React from "react";
import { 
  Wheat, 
  Coffee, 
  Package, 
  Milk, 
  Apple, 
  Carrot, 
  ShoppingBasket, 
  Wine,
  HelpCircle
} from "lucide-react";

interface CategoryIconProps {
  category: string;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = "h-4 w-4" }) => {
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "féculents":
        return <Wheat className={className} />;
      case "boissons":
        return <Coffee className={className} />;
      case "conserves":
        return <Package className={className} />;
      case "produits laitiers":
        return <Milk className={className} />;
      case "fruits":
        return <Apple className={className} />;
      case "légumes":
        return <Carrot className={className} />;
      case "épicerie":
        return <ShoppingBasket className={className} />;
      case "boissons alcoolisées":
        return <Wine className={className} />;
      default:
        return <HelpCircle className={className} />;
    }
  };

  return getIcon(category);
};

export default CategoryIcon;
