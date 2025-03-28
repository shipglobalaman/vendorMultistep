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
import { Loader2, SquareArrowOutUpRight } from "lucide-react";
import murli_pan from "/murli_pan.jpg";

interface Document {
  id: number;
  fileName: string;
  documentNo?: string;
  documentStatus?: string;
}

interface DocumentPreviewDialogProps {
  document: Document;
  onStatusChange: (id: number, status: string) => void;
}

interface DocumentDetail {
  label: string;
  value: string;
}

interface ActionButtonsProps {
  isApproving: boolean;
  isRejecting: boolean;
  handleApprove: () => void;
  handleReject: () => void;
}

const DocumentDetails: React.FC<{ details: DocumentDetail[] }> = ({
  details,
}) => (
  <div className="space-y-4">
    {details.map((item, index) => (
      <div key={index} className="flex items-baseline">
        <h3 className="font-semibold text-sm">{item.label} :</h3>
        <span className="ml-1 text-gray-500 text-sm">{item.value}</span>
      </div>
    ))}
  </div>
);

const DocumentImage: React.FC = () => (
  <div className="bg-gray-50 p-6 min-h-[400px] flex items-center justify-center">
    <img
      src={murli_pan}
      alt="Document"
      className="w-full h-full object-cover"
    />
  </div>
);

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isApproving,
  isRejecting,
  handleApprove,
  handleReject,
}) => (
  <div className="p-6 flex justify-center gap-4">
    <Select disabled={isRejecting} onValueChange={handleReject}>
      <SelectTrigger className="w-28 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600">
        {isRejecting ? (
          <div className="flex items-center">
            Rejecting...
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        ) : (
          <SelectValue placeholder="Reject" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="aadhar_mismatch">Aadhar Number Mismatch</SelectItem>
        <SelectItem value="invalid_image">Invalid Image</SelectItem>
        <SelectItem value="original_colored_aadhar">
          Original-Colored Aadhar Not Submitted
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
);

export function DocumentPreviewDialog({
  document,
  onStatusChange,
}: DocumentPreviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onStatusChange(document.id, "Approved");
    setOpen(false);
    setIsApproving(false);
  };

  const handleReject = async () => {
    setIsRejecting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onStatusChange(document.id, "Rejected");
    setOpen(false);
    setIsRejecting(false);
  };

  const previewDocumentDetails: DocumentDetail[] = [
    { label: "Document Name", value: document?.fileName ?? "AADHAR_FRONT" },
    { label: "Document No", value: document?.documentNo ?? "544785115278" },
    { label: "Document Status", value: document?.documentStatus ?? "Pending" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="flex text-blue-500 cursor-pointer">
          View <SquareArrowOutUpRight className="ml-2 size-4 text-blue-500" />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <div className="p-6">
          <DocumentDetails details={previewDocumentDetails} />
        </div>
        <DocumentImage />
        <ActionButtons
          isApproving={isApproving}
          isRejecting={isRejecting}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      </DialogContent>
    </Dialog>
  );
}
