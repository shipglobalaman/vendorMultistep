import DashboardPage from "@/layouts/DashboardPage";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import { kycHeadData } from "@/lib/const";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/components/store/Hooks";
import { setCurrentCustomerId } from "@/components/store/KycSlice";
import { setCurrentCustomerId as setDocumentCustomerId } from "@/components/store/DocumentSlice";
import { useEffect } from "react";
import clsx from "clsx";

interface KYCRecord {
  id: string;
  firstName: string;
  lastName: string;
  completionDate: string;
  doneByEmail: string;
  doneByPhone: string;
  kycStatus: string;
  csbStatus: string;
  lastVerificationDate: string;
  verifiedBy: string;
}

const StatusIndicator: React.FC<{ status: string }> = ({ status }) => {
  const statusClass = clsx({
    "text-green-500": status === "Done",
    "text-yellow-500": status === "Pending",
    "text-red-500": status !== "Done" && status !== "Pending",
  });
  return <span className={statusClass}>{status}</span>;
};

const KYCRow: React.FC<{
  kycrecord: KYCRecord;
  onViewClick: (id: string) => void;
}> = ({ kycrecord, onViewClick }) => (
  <TableRow>
    <TableCell className="max-w-20 truncate text-xs">{kycrecord.id}</TableCell>
    <TableCell className="max-w-20 truncate text-xs">
      {kycrecord.firstName}
      <br />
      {kycrecord.lastName}
    </TableCell>
    <TableCell className="max-w-24 truncate text-xs">
      {kycrecord.completionDate}
    </TableCell>
    <TableCell className="max-w-48 truncate text-xs">
      {kycrecord.doneByEmail}
      <br />
      {kycrecord.doneByPhone}
    </TableCell>
    <TableCell className="max-w-20 truncate text-xs">
      <StatusIndicator status={kycrecord.kycStatus} />
    </TableCell>
    <TableCell className="max-w-20 truncate text-xs">
      <StatusIndicator status={kycrecord.csbStatus} />
    </TableCell>
    <TableCell className="max-w-20 truncate text-xs">
      {kycrecord.lastVerificationDate}
    </TableCell>
    <TableCell className="max-w-64 truncate text-xs">
      {kycrecord.verifiedBy}
    </TableCell>
    <TableCell className="text-right">
      <Link to="/verification-history">
        <Button
          onClick={() => onViewClick(kycrecord.id)}
          size="sm"
          className="bg-blue-800 text-white hover:text-white hover:bg-blue-700">
          View
        </Button>
      </Link>
    </TableCell>
  </TableRow>
);

const KYCTable: React.FC<{
  records: KYCRecord[];
  onViewClick: (id: string) => void;
}> = ({ records, onViewClick }) => (
  <Table>
    <TableHeader>
      <TableRow>
        {kycHeadData.map((header, index) => (
          <TableHead
            key={index}
            className="text-black font-semibold whitespace-nowrap">
            {header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {records.map((record) => (
        <KYCRow key={record.id} kycrecord={record} onViewClick={onViewClick} />
      ))}
    </TableBody>
  </Table>
);

export default function BusinessKYCVerification() {
  const IndividualKycData = useAppSelector(
    (state) => state.kyc.records as KYCRecord[]
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (IndividualKycData.length > 0) {
      dispatch(setCurrentCustomerId(IndividualKycData[0].id));
      dispatch(setDocumentCustomerId(IndividualKycData[0].id));
    }
  }, [dispatch, IndividualKycData]);

  const handleViewClick = (id: string) => {
    dispatch(setCurrentCustomerId(id));
    dispatch(setDocumentCustomerId(id));
  };

  return (
    <DashboardPage>
      <h1 className="font-bold text-xl mb-4">KYC Verification</h1>
      <div className="bg-white p-4 rounded-md">
        <Tabs defaultValue="individual" className="mb-9">
          <TabsList className="grid grid-cols-3 w-96 mb-5">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="upcominglut">Upcoming LUT</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <div className="p-4 border rounded-md">
              <div className="flex items-center py-2 pb-4 gap-3">
                <h1 className="font-bold">Individual KYC Verification</h1>
                <Button
                  variant="outline"
                  className="bg-blue-800 text-white border-none gap-2 hover:bg-blue-700 hover:text-white">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              <KYCTable
                records={IndividualKycData}
                onViewClick={handleViewClick}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPage>
  );
}
