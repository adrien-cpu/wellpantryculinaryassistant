
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PantryItem } from "@/types/pantry";
import { Edit, Trash2, CheckCircle, ChevronUp, ChevronDown } from "lucide-react";
import StatusBadge from "./StatusBadge";
import CategoryIcon from "./CategoryIcon";

interface PantryItemsTableProps {
  items: PantryItem[];
  onEdit: (item: PantryItem) => void;
  onConsume: (item: PantryItem) => void;
  onDelete: (item: PantryItem) => void;
  sortField: keyof PantryItem;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof PantryItem) => void;
}

const PantryItemsTable: React.FC<PantryItemsTableProps> = ({
  items,
  onEdit,
  onConsume,
  onDelete,
  sortField,
  sortDirection,
  onSort,
}) => {
  const getSortIcon = (field: keyof PantryItem) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const SortableHeader = ({ field, children }: { field: keyof PantryItem; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-wp-green-light/50 select-none"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {getSortIcon(field)}
      </div>
    </TableHead>
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-wp-gray-dark italic">Aucun aliment trouvé avec ces critères</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-wp-green-light overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-wp-green-light">
            <SortableHeader field="name">Aliment</SortableHeader>
            <SortableHeader field="category">Catégorie</SortableHeader>
            <SortableHeader field="quantity">Quantité</SortableHeader>
            <SortableHeader field="expiryDate">Date d'expiration</SortableHeader>
            <SortableHeader field="status">Statut</SortableHeader>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow 
              key={index} 
              className="hover:bg-wp-green-light/30 transition-colors"
            >
              <TableCell className="font-medium text-wp-brown-dark dark:text-wp-brown">
                <div className="flex items-center gap-2">
                  <CategoryIcon category={item.category} />
                  {item.name}
                </div>
              </TableCell>
              <TableCell className="text-wp-gray-dark dark:text-wp-gray-light">
                {item.category}
              </TableCell>
              <TableCell className="text-wp-gray-dark dark:text-wp-gray-light">
                {item.quantity}
              </TableCell>
              <TableCell className="text-wp-gray-dark dark:text-wp-gray-light">
                {item.expiryDate}
              </TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onConsume(item)}
                    className="h-8 px-2 text-wp-green hover:text-wp-green-dark hover:bg-wp-green-light"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(item)}
                    className="h-8 px-2 text-wp-orange hover:text-wp-orange-dark hover:bg-wp-orange-light"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(item)}
                    className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PantryItemsTable;
