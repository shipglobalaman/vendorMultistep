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
import { useEffect, useMemo, useState } from "react";
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
interface SubmitButtonProps {
  isAllApproved: boolean;
  isSubmitted: boolean;
  onSubmit: () => void;
}

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

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isAllApproved,
  isSubmitted,
  onSubmit,
}) => {
  return (
    <div className="flex justify-end mt-8">
      {!isSubmitted ? (
        <Button
          size="lg"
          className={clsx(
            "mr-20",
            isAllApproved
              ? "bg-blue-800 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          )}
          onClick={isAllApproved ? onSubmit : () => {}}
          disabled={!isAllApproved}>
          Submit
        </Button>
      ) : (
        <Button className="mr-20 bg-green-600 hover:bg-green-500" disabled>
          <span className="flex items-center">
            <Check className="mr-1 h-5 w-5" /> Approved
          </span>
        </Button>
      )}
    </div>
  );
};

const CustomerDetails = () => {
  const customerDetails = [
    { label: "Name", value: "Aman Tripathi" },
    { label: "Customer Id", value: "12345678" },
    { label: "Customer Email ID", value: "161@vendorexample.com" },
    { label: "Customer Mobile No", value: "96518376932" },
  ];

  return (
    <div className="w-fit rounded-md border border-gray-100 p-2">
      <p className="font-semibold text-lg ml-2 mb-2">Customer Details</p>
      <div className="flex gap-16">
        {customerDetails.map((detail, index) => (
          <div key={index} className="m-2 space-y-2">
            <p className="text-gray-400 text-sm">{detail.label}</p>
            <p className="text-sm">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const VerificationHistory = () => {
  return (
    <div className="border border-gray-100 p-4 rounded-md">
      <p className="font-semibold text-lg mb-4">KYC Verification History</p>
      <div>
        <p className="font-normal p-5 text-center">No Data Found</p>
      </div>
    </div>
  );
};

export default function DocumentManagement(): JSX.Element {
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { documents, isSubmitted, currentCustomerId } = useAppSelector(
    (state) => state.documents
  );

  const finalDocuments = useMemo(
    () => (currentCustomerId ? documents[currentCustomerId] || [] : []),
    [currentCustomerId, documents]
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showSuccessDialog) {
      timer = setTimeout(() => {
        setShowSuccessDialog(false);
        dispatch(setSubmitted(true));
        if (
          finalDocuments &&
          finalDocuments.every((doc) => doc.documentStatus === "Approved")
        ) {
          dispatch(updateKycStatus());
        }
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessDialog, dispatch, finalDocuments]);

  const handleToggleDocumentSelection = (id: number): void => {
    dispatch(toggleDocumentSelection(id));
  };

  const handleStatusChange = (id: number, status: string): void => {
    dispatch(updateDocumentStatus({ id, status }));
  };

  const handleSubmit = (): void => {
    setShowSuccessDialog(true);
  };

  const isAllApproved =
    finalDocuments &&
    finalDocuments.length > 0 &&
    finalDocuments.every((doc) => doc.documentStatus === "Approved");

  return (
    <DashboardPage className="bg-white p-4 rounded-md">
      <div className="flex items-center mb-4 gap-2">
        <p className="font-bold text-xl">KYC</p>
        <Badge className="bg-yellow-50 text-yellow-500 border-yellow-500 rounded-full">
          Pending
        </Badge>
      </div>
      <CustomerDetails />
      <p className="text-sm mt-10 mb-4">
        <span className="text-red-500 font-medium">Please Note: </span>All
        documents must be verified by a third party before proceeding to the
        final verification.
      </p>
      <div className="border border-gray-100 p-4 rounded-md mb-4">
        <p className="font-semibold text-lg mb-4">
          Individual KYC Verification
        </p>
        <DocumentTable
          documents={finalDocuments}
          onToggleSelection={handleToggleDocumentSelection}
          onStatusChange={handleStatusChange}
        />
        <SubmitButton
          isAllApproved={isAllApproved}
          isSubmitted={isSubmitted}
          onSubmit={handleSubmit}
        />
      </div>
      <VerificationHistory />
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </DashboardPage>
  );
}
