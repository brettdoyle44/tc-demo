"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ReferralStatus = "In progress" | "Provider accepted" | "Provider rejected";

interface Referral {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  referredProvider: string;
  status: ReferralStatus;
}

const mockReferrals: Referral[] = [
  {
    firstName: "James",
    lastName: "Wilson",
    dateOfBirth: "03/15/1985",
    referredProvider: "Dr. Sarah Chen",
    status: "In progress",
  },
  {
    firstName: "Maria",
    lastName: "Garcia",
    dateOfBirth: "07/22/1992",
    referredProvider: "Dr. Michael Rodriguez",
    status: "Provider accepted",
  },
  {
    firstName: "Robert",
    lastName: "Johnson",
    dateOfBirth: "11/30/1978",
    referredProvider: "Dr. Emily Thompson",
    status: "Provider rejected",
  },
  {
    firstName: "Emily",
    lastName: "Brown",
    dateOfBirth: "09/12/1990",
    referredProvider: "Dr. David Martinez",
    status: "In progress",
  },
  {
    firstName: "William",
    lastName: "Davis",
    dateOfBirth: "05/28/1982",
    referredProvider: "Dr. Jennifer Lee",
    status: "Provider accepted",
  },
  {
    firstName: "Sofia",
    lastName: "Martinez",
    dateOfBirth: "01/17/1995",
    referredProvider: "Dr. Richard Patel",
    status: "In progress",
  },
  {
    firstName: "Michael",
    lastName: "Taylor",
    dateOfBirth: "04/03/1988",
    referredProvider: "Dr. Lisa Johnson",
    status: "Provider accepted",
  },
  {
    firstName: "Emma",
    lastName: "Anderson",
    dateOfBirth: "08/09/1993",
    referredProvider: "Dr. Robert Kim",
    status: "Provider rejected",
  },
  {
    firstName: "David",
    lastName: "Thomas",
    dateOfBirth: "12/21/1975",
    referredProvider: "Dr. Maria Chen",
    status: "In progress",
  },
  {
    firstName: "Isabella",
    lastName: "Moore",
    dateOfBirth: "06/14/1987",
    referredProvider: "Dr. James Williams",
    status: "Provider accepted",
  },
];

const getStatusStyles = (status: ReferralStatus) => {
  switch (status) {
    case "In progress":
      return "bg-yellow-100 text-yellow-800";
    case "Provider accepted":
      return "bg-green-100 text-green-800";
    case "Provider rejected":
      return "bg-red-100 text-red-800";
  }
};

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Referrals</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold">First Name</TableHead>
                  <TableHead className="font-semibold">Last Name</TableHead>
                  <TableHead className="font-semibold">Date of Birth</TableHead>
                  <TableHead className="font-semibold">
                    Referred Provider
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReferrals.map((referral, index) => (
                  <TableRow key={index}>
                    <TableCell>{referral.firstName}</TableCell>
                    <TableCell>{referral.lastName}</TableCell>
                    <TableCell>{referral.dateOfBirth}</TableCell>
                    <TableCell>{referral.referredProvider}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${getStatusStyles(
                          referral.status
                        )}`}
                      >
                        {referral.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
