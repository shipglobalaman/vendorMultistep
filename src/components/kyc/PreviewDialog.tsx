import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import murli_pan from "/murli_pan.jpg";

interface DocumentPreviewDialogProps {
  document: {
    fileName: string;
    documentNo?: string;
    documentStatus?: string;
  };
}

export function DocumentPreviewDialog({
  document,
}: DocumentPreviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setOpen(false);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setOpen(false);
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-50 text-blue-400 hover:text-white hover:bg-blue-400">
          Preview & Verify
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline">
                <h3 className="font-semibold text-sm">Document Name :</h3>
                <span className="ml-1 text-gray-500 text-sm">
                  {document.fileName || "AADHAR_FRONT"}
                </span>
              </div>

              <div className="flex items-baseline">
                <h3 className="font-semibold text-sm">Document No :</h3>
                <span className="ml-1 text-gray-500 text-sm">
                  {document.documentNo || "544785115278"}
                </span>
              </div>

              <div className="flex items-baseline">
                <h3 className="font-semibold text-sm">Document Status :</h3>
                <span className="ml-1 text-gray-500 text-sm">
                  {document.documentStatus || "Pending"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 min-h-[400px] flex items-center justify-center">
          <div className="w-full h-full">
            <img
              src={murli_pan}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-6 flex justify-center gap-4">
          <Select disabled={isRejecting} onValueChange={() => handleReject()}>
            <SelectTrigger className="w-28 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600">
              <SelectValue
                placeholder={
                  isRejecting ? (
                    <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Rejecting...
                    </div>
                  ) : (
                    "Reject"
                  )
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aadhar_mismatch">
                Aadhar Number Mismatch
              </SelectItem>
              <SelectItem value="Invalid Image">Invalid Image</SelectItem>
              <SelectItem value="Original-Colored Adhar Not Submitted">
                Original-Colored Adhar Not Submitted
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleApprove}
            disabled={isApproving}>
            {isApproving ? (
              <>
                Approving...
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Approve"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
