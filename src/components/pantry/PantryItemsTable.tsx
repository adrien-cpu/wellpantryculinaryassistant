
import React from "react";
import { Button } from "@/components/ui/button";
import { PantryItem } from "@/types/pantry";

interface PantryItemsTableProps {
  items: PantryItem[];
  onEdit?: (item: PantryItem) => void;
  onConsume?: (item: PantryItem) => void;
  onDelete?: (item: PantryItem) => void;
}

const PantryItemsTable: React.FC<PantryItemsTableProps> = ({
  items,
  onEdit,
  onConsume,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-wp-gray">
            <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Nom</th>
            <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Catégorie</th>
            <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Quantité</th>
            <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Date d'expiration</th>
            <th className="py-2 px-4 text-left text-wp-green-dark dark:text-wp-green">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-wp-gray hover:bg-wp-gray-light/50 dark:hover:bg-wp-gray-dark/50">
              <td className="py-3 px-4">{item.name}</td>
              <td className="py-3 px-4">{item.category}</td>
              <td className="py-3 px-4">{item.quantity}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center ${item.status === 'expiring' ? 'text-wp-orange-dark' : 'text-wp-gray-dark dark:text-wp-gray-light'}`}>
                  {item.expiryDate}
                  {item.status === 'expiring' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 text-wp-orange-dark">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  )}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit && onEdit(item)} className="h-8 w-8 p-0">
                    <span className="sr-only">Modifier</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onConsume && onConsume(item)} className="h-8 w-8 p-0 text-wp-orange-dark">
                    <span className="sr-only">Consommer</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete && onDelete(item)} className="h-8 w-8 p-0 text-destructive">
                    <span className="sr-only">Supprimer</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PantryItemsTable;
