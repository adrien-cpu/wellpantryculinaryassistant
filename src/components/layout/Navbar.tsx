
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Garde-manger", path: "/pantry" },
    { name: "Planification", path: "/meal-planning" },
    { name: "Recettes", path: "/recipes" },
    { name: "Potager", path: "/garden" },
    { name: "Carte", path: "/map" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-wp-gray-dark border-b border-wp-gray shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-wp-green rounded-md flex items-center justify-center">
              <span className="text-white font-bold">WP</span>
            </div>
            <span className="font-semibold text-xl text-wp-green-dark dark:text-wp-green">WellPantry</span>
          </Link>

          {isMobile ? (
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 p-0">
                    <span className="sr-only">Menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.path} className="cursor-pointer">
                      <Link 
                        to={link.path} 
                        className="w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-wp-gray-dark hover:text-wp-green transition-colors dark:text-wp-gray-light dark:hover:text-wp-green"
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="default" className="bg-wp-green hover:bg-wp-green-dark">
                Connexion
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
