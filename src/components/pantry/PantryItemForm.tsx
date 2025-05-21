
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PantryItem } from "@/types/pantry";
import { Archive, Refrigerator, Wine } from "lucide-react";

interface PantryItemFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: PantryItem) => void;
  initialData?: Partial<PantryItem>;
}

const PantryItemForm: React.FC<PantryItemFormProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const form = useForm<PantryItem>({
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      quantity: initialData?.quantity || "",
      expiryDate: initialData?.expiryDate || "",
      status: initialData?.status || "ok",
      storageType: initialData?.storageType || "cabinet",
    },
  });

  const handleSubmit = (data: PantryItem) => {
    onSave(data);
    onClose();
  };

  const storageOptions = [
    {
      id: "fridge",
      name: "Réfrigérateur",
      icon: <Refrigerator className="mr-2 h-5 w-5" />,
    },
    {
      id: "cabinet",
      name: "Placard",
      icon: <Archive className="mr-2 h-5 w-5" />,
    },
    {
      id: "wine-cellar",
      name: "Cave à vin",
      icon: <Wine className="mr-2 h-5 w-5" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Modifier un aliment" : "Ajouter un aliment"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nom de l'aliment" required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Catégorie" required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Quantité (ex: 500g)" required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'expiration</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="JJ/MM/AAAA" required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storageType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emplacement de stockage</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un emplacement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {storageOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          <div className="flex items-center">
                            {option.icon}
                            <span>{option.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-wp-green hover:bg-wp-green-dark">
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PantryItemForm;
