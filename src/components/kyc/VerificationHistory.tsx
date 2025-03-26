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
import { useState } from "react";
import { DocumentPreviewDialog } from "./PreviewDialog";
import { Badge } from "@/components/ui/badge";
import { initialdocuments } from "@/lib/const";

export default function DocumentManagement() {
  const [documents, setDocuments] = useState(initialdocuments);

  const toggleDocumentSelection = (id: number) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, selected: !doc.selected } : doc
      )
    );
  };

  return (
    <DashboardPage className="bg-white p-4 rounded-md">
      <div className="flex items-center mb-8 gap-3">
        <h1 className="font-bold">KYC Verification</h1>
      </div>
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
                <TableRow key={document.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={document.selected}
                        onCheckedChange={() =>
                          toggleDocumentSelection(document.id)
                        }
                        aria-label={`Select document ${document.id}`}
                      />
                      {document.id}.
                    </div>
                  </TableCell>
                  <TableCell>
                    {document.documentName}
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-500 font-normal border-green-500 ml-1">
                      3P Verified
                    </Badge>
                  </TableCell>
                  <TableCell>{document.fileName}</TableCell>
                  <TableCell>{document.lastUpdated}</TableCell>
                  <TableCell>
                    <span
                      className={`${
                        document.documentStatus === "Approved"
                          ? "text-green-500"
                          : document.documentStatus === "Pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}>
                      {document.documentStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DocumentPreviewDialog document={document} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardPage>
  );
}
