import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardPage from "@/layouts/DashboardPage";
import { useEffect, useState } from "react";
import { DocumentPreviewDialog } from "./PreviewDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { SuccessDialog } from "./SuccessDialog";
import { Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/components/store/Hooks";
import {
  toggleDocumentSelection,
  updateDocumentStatus,
  setSubmitted,
} from "@/components/store/DocumentSlice";
import { updateKycStatus } from "../store/KycSlice";
import type React from "react";
import clsx from "clsx";

interface Document {
  id: number;
  documentName: string;
  fileName: string;
  lastUpdated: string;
  documentStatus: string;
  selected: boolean;
}
interface DocumentRowProps {
  document: Document;
  onToggleSelection: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}
interface DocumentTableProps {
  documents: Document[];
  onToggleSelection: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}

const DocumentHeader: React.FC = () => {
  return (
    <div className="flex items-center mb-8 gap-3">
      <h1 className="font-bold">KYC Verification</h1>
    </div>
  );
};

const DocumentRow: React.FC<DocumentRowProps> = ({
  document,
  onToggleSelection,
  onStatusChange,
}) => {
  const getStatusColor = (status: string) => {
    return status === "Approved"
      ? "text-green-500"
      : status === "Pending"
      ? "text-yellow-500"
      : "text-red-500";
  };
  return (
    <TableRow>
      <TableCell className="font-medium p-6">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={document.selected}
            onCheckedChange={() => onToggleSelection(document.id)}
            aria-label={`Select document ${document.id}`}
          />
          {document.id}.
        </div>
      </TableCell>
      <TableCell>
        {document.documentName}
        <Badge
          variant="outline"
          className="bg-green-50 text-green-500 font-normal border-green-500 ml-2">
          3P Verified
        </Badge>
      </TableCell>
      <TableCell>{document.fileName}</TableCell>
      <TableCell>{document.lastUpdated}</TableCell>
      <TableCell>
        <span className={getStatusColor(document.documentStatus)}>
          {document.documentStatus}
        </span>
      </TableCell>
      <TableCell>
        <DocumentPreviewDialog
          document={document}
          onStatusChange={onStatusChange}
        />
      </TableCell>
    </TableRow>
  );
};

const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  onToggleSelection,
  onStatusChange,
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Sr. No.</TableHead>
              <TableHead>Document Name</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Document Status</TableHead>
              <TableHead>Preview/Verify</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <DocumentRow
                key={document.id}
                document={document}
                onToggleSelection={onToggleSelection}
                onStatusChange={onStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

interface SubmitButtonProps {
  isAllApproved: boolean;
  isSubmitted: boolean;
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isAllApproved,
  isSubmitted,
  onSubmit,
}) => {
  if (!isAllApproved) return null;

  return (
    <div className="flex justify-end">
      <Button
        size="lg"
        className={clsx(
          "mt-6 mr-2",
          isSubmitted
            ? "bg-green-600 hover:bg-green-500"
            : "bg-blue-800 hover:bg-blue-700"
        )}
        onClick={!isSubmitted ? onSubmit : undefined}
        disabled={isSubmitted}>
        {isSubmitted ? (
          <span className="flex items-center">
            <Check className="mr-1 h-5 w-5" /> Approved
          </span>
        ) : (
          "Submit"
        )}
      </Button>
    </div>
  );
};

export default function DocumentManagement(): JSX.Element {
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { documents, isSubmitted } = useAppSelector((state) => state.documents);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showSuccessDialog) {
      timer = setTimeout(() => {
        setShowSuccessDialog(false);
        dispatch(setSubmitted(true));
        if (documents.every((doc) => doc.documentStatus === "Approved")) {
          dispatch(updateKycStatus());
        }
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessDialog, dispatch, documents]);

  const handleToggleDocumentSelection = (id: number): void => {
    dispatch(toggleDocumentSelection(id));
  };

  const handleStatusChange = (id: number, status: string): void => {
    dispatch(updateDocumentStatus({ id, status }));
  };

  const handleSubmit = (): void => {
    setShowSuccessDialog(true);
  };

  const isAllApproved = documents.every(
    (doc) => doc.documentStatus === "Approved"
  );

  return (
    <DashboardPage className="bg-white p-4 rounded-md">
      <DocumentHeader />

      <DocumentTable
        documents={documents}
        onToggleSelection={handleToggleDocumentSelection}
        onStatusChange={handleStatusChange}
      />

      <SubmitButton
        isAllApproved={isAllApproved}
        isSubmitted={isSubmitted}
        onSubmit={handleSubmit}
      />

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </DashboardPage>
  );
}
