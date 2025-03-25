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

export default function BusinessKYCVerification() {
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
          {kycData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="max-w-20 truncate text-xs">
                {item.id}
              </TableCell>
              <TableCell className="max-w-20 truncate text-xs">
                {item.firstName}
                <br />
                {item.lastName}
              </TableCell>
              <TableCell className="max-w-24 truncate text-xs">
                {item.completionDate}
              </TableCell>
              <TableCell className="max-w-48 truncate text-xs">
                {item.doneByEmail}
                <br />
                {item.doneByPhone}
              </TableCell>
              <TableCell className="max-w-20 truncate text-xs">
                <span
                  className={`${
                    item.kycStatus === "Done"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}>
                  {item.kycStatus}
                </span>
              </TableCell>
              <TableCell className="max-w-20 truncate text-xs">
                <span
                  className={`${
                    item.csbStatus === "Done"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}>
                  {item.csbStatus}
                </span>
              </TableCell>
              <TableCell className="max-w-20 truncate text-xs">
                {item.lastVerificationDate}
              </TableCell>
              <TableCell className="max-w-64 truncate text-xs">
                {item.verifiedBy}
              </TableCell>
              <TableCell className="text-right">
                <Button className="bg-blue-50 text-blue-400">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardPage>
  );
}
const kycHeadData = [
  "Customer ID",
  "Customer Name",
  "KYC Date",
  "KYC Done By",
  "KYC Status",
  "CSB V Status",
  "Last Verification On",
  "Verified By",
  "Actions",
];
const kycData = [
  {
    id: "566",
    firstName: "firstname_566dxfcgvhjdfcgvhujgvhbj",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  {
    id: "566",
    firstName: "firstname_566",
    lastName: "lastname_566",
    completionDate: "2022-06-08",
    doneByEmail: "566@vendorexample.com",
    doneByPhone: "9999999566",
    kycStatus: "Done",
    csbStatus: "Rejected",
    lastVerificationDate: "2024-10-28",
    verifiedBy: "neeraj.s@shipglobal.in",
  },
  
];
