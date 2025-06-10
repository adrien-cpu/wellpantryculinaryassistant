import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { Home, BookOpen, Leaf, Calendar, ShoppingBasket, Map, Sparkles, User, FlaskConical, LogOut, Settings } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

const navigationLinks = [
  { name: "Tableau de bord", href: "/dashboard", icon: <Home className="w-5 h-5 mr-2" /> },
  { name: "Recettes", href: "/recipes", icon: <BookOpen className="w-5 h-5 mr-2" /> },
  { name: "Potager", href: "/garden", icon: <Leaf className="w-5 h-5 mr-2" /> },
  { name: "Planification", href: "/meal-planning", icon: <Calendar className="w-5 h-5 mr-2" /> },
  { name: "Garde-manger", href: "/pantry", icon: <ShoppingBasket className="w-5 h-5 mr-2" /> },
  { name: "Carte", href: "/map", icon: <Map className="w-5 h-5 mr-2" /> },
  { name: "Gastronomie", href: "/molecular", icon: <FlaskConical className="w-5 h-5 mr-2" /> },
  { name: "Fonctionnalités", href: "/features", icon: <Sparkles className="w-5 h-5 mr-2" /> },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fermer le menu lors d'un changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-wp-gray-dark border-b border-wp-gray shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo à gauche */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-wp-green rounded-md flex items-center justify-center">
              <span className="text-white font-bold">WP</span>
            </div>
            <span className="font-semibold text-xl text-wp-green-dark dark:text-wp-green">WellPantry</span>
          </Link>
          {/* Menu à droite */}
          {isMobile ? (
            <div className="flex items-center">
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 p-0" onClick={toggleMenu}>
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
                <DropdownMenuContent align="end" className="w-[200px] max-h-[80vh] overflow-y-auto">
                  {navigationLinks.map((link) => (
                    <DropdownMenuItem key={link.href} className="cursor-pointer">
                      <Link 
                        to={link.href} 
                        className="w-full flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  {user && (
                    <>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link 
                          to="/profil" 
                          className="w-full flex items-center"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="w-5 h-5 mr-2" />
                          Profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link 
                          to="/UserSettings" 
                          className="w-full flex items-center"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Settings className="w-5 h-5 mr-2" />
                          Paramètres
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <div className="w-full">
                          <LogoutButton />
                        </div>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <nav className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-4 overflow-x-auto max-w-[calc(100vw-200px)]">
                  {navigationLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      className={({ isActive }) =>
                        `flex items-center text-sm transition-colors px-2 py-1 rounded whitespace-nowrap
                        ${isActive 
                          ? "bg-wp-green-light text-wp-green-dark font-bold" 
                          : "text-wp-gray-dark hover:text-wp-green dark:text-wp-gray-light dark:hover:text-wp-green"}`
                      }
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center focus:outline-none ml-4">
                      <User className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profil" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/UserSettings" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Paramètres
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogoutButton />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild size="sm" variant="outline" className="border-white text-white hover:bg-wp-green-dark">
                  <Link to="/login">Connexion</Link>
                </Button>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;