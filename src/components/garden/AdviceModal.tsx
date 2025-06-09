import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AdviceModalProps {
  tips: string[];
  onClose: () => void;
}

const AdviceModal: React.FC<AdviceModalProps> = ({ tips, onClose }) => (
  <Dialog open onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Conseils pour cette plante</DialogTitle>
      </DialogHeader>
      <ul className="list-disc pl-5">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
      <DialogFooter>
        <Button onClick={onClose}>Fermer</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default AdviceModal;