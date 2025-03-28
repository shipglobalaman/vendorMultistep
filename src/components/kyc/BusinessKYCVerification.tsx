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
import { Filter } from "lucide-react";
import { kycHeadData } from "@/lib/const";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/components/store/Hooks";
import { setCurrentCustomerId } from "@/components/store/KycSlice";
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
  record: KYCRecord;
  onViewClick: (id: string) => void;
}> = ({ record, onViewClick }) => (
  <TableRow>
    <TableCell className="max-w-20 truncate text-xs">{record.id}</TableCell>
    <TableCell className="max-w-20 truncate text-xs">
      {record.firstName}
      <br />
      {record.lastName}
    </TableCell>
    <TableCell className="max-w-24 truncate text-xs">
      {record.completionDate}
    </TableCell>
    <TableCell className="max-w-48 truncate text-xs">
      {record.doneByEmail}
      <br />
      {record.doneByPhone}
    </TableCell>
    <TableCell className="max-w-20 truncate text-xs">
      <StatusIndicator status={record.kycStatus} />
    </TableCell>
    <TableCell className="max-w-20 truncate text-xs">
      <StatusIndicator status={record.csbStatus} />
    </TableCell>
    <TableCell className="max-w-20 truncate text-xs">
      {record.lastVerificationDate}
    </TableCell>
    <TableCell className="max-w-64 truncate text-xs">
      {record.verifiedBy}
    </TableCell>
    <TableCell className="text-right">
      <Link to="/verification-history">
        <Button
          onClick={() => onViewClick(record.id)}
          className="bg-blue-50 text-blue-400 hover:text-white hover:bg-blue-400">
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
        <KYCRow key={record.id} record={record} onViewClick={onViewClick} />
      ))}
    </TableBody>
  </Table>
);

export default function BusinessKYCVerification() {
  const kycData = useAppSelector((state) => state.kyc.records as KYCRecord[]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (kycData.length > 0) dispatch(setCurrentCustomerId(kycData[0].id));
  }, [dispatch, kycData]);

  const handleViewClick = (id: string) => {
    dispatch(setCurrentCustomerId(id));
  };

  return (
    <DashboardPage className="bg-white p-4 rounded-md">
      <div className="flex items-center mb-8 gap-3">
        <h1 className="font-bold">Business KYC Verification</h1>
        <Button
          variant="outline"
          className="bg-blue-50 text-blue-500 border-none gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      <KYCTable records={kycData} onViewClick={handleViewClick} />
    </DashboardPage>
  );
}
