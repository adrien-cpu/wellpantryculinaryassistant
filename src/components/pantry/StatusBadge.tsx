
import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "ok" | "expiring" | "expired";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "ok":
        return {
          label: "Bon état",
          icon: <CheckCircle className="h-3 w-3" />,
          className: "bg-wp-green-light text-wp-green-dark border-wp-green"
        };
      case "expiring":
        return {
          label: "Expire bientôt",
          icon: <AlertCircle className="h-3 w-3" />,
          className: "bg-wp-orange-light text-wp-orange-dark border-wp-orange"
        };
      case "expired":
        return {
          label: "Expiré",
          icon: <XCircle className="h-3 w-3" />,
          className: "bg-red-100 text-red-800 border-red-300"
        };
      default:
        return {
          label: "Inconnu",
          icon: <AlertCircle className="h-3 w-3" />,
          className: "bg-wp-gray-light text-wp-gray-dark border-wp-gray"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant="outline" className={`${config.className} flex items-center gap-1`}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
