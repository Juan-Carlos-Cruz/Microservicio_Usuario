import { ReactNode } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string; // Optional title for accessibility
  children: ReactNode;
}

export default function Modal({ open, onOpenChange, title = "Modal", children }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="hidden" />
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gray-900 text-white p-6 rounded-lg">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
}
