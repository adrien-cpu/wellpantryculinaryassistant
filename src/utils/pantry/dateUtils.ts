
// Fonction utilitaire pour convertir des dates au format JJ/MM/AAAA en objets Date
export const parseExpiryDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Fonction de tri par date d'expiration
export const sortByExpiryDate = (a: { expiryDate: string }, b: { expiryDate: string }): number => {
  const dateA = parseExpiryDate(a.expiryDate);
  const dateB = parseExpiryDate(b.expiryDate);
  return dateA.getTime() - dateB.getTime();
};

// Vérifier le statut d'expiration en fonction de la date
export const getExpirationStatus = (expiryDate: string): "ok" | "expiring" | "expired" => {
  const today = new Date();
  const parsedExpiryDate = parseExpiryDate(expiryDate);
  
  // Calculer la différence en jours
  const diffTime = parsedExpiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) {
    return "expired";
  } else if (diffDays <= 7) {
    return "expiring";
  }
  return "ok";
};
