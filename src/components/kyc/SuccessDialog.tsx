import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
}

export function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Verified!</h2>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2"
          onClick={() => onOpenChange(false)}>
          Ok, got it!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
