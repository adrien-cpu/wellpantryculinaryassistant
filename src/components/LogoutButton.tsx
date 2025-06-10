import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };
  return (
    <button onClick={handleLogout} className="flex items-center w-full text-red-500 hover:text-red-700">
      <LogOut className="w-4 h-4 mr-2" />
      Déconnexion
    </button>
  );
}