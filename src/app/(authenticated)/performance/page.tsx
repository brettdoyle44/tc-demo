"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for referrals over time
const referralData = [
  { month: "Jan", referrals: 65 },
  { month: "Feb", referrals: 78 },
  { month: "Mar", referrals: 90 },
  { month: "Apr", referrals: 81 },
  { month: "May", referrals: 95 },
  { month: "Jun", referrals: 88 },
  { month: "Jul", referrals: 102 },
];

// Mock data for referral status distribution
const statusData = [
  { status: "In Progress", value: 35, color: "#fbbf24" },
  { status: "Accepted", value: 45, color: "#34d399" },
  { status: "Rejected", value: 20, color: "#f87171" },
];

// Mock data for top referring specialties
const specialtyData = [
  { specialty: "Primary Care", count: 45 },
  { specialty: "Cardiology", count: 38 },
  { specialty: "Orthopedics", count: 32 },
  { specialty: "Neurology", count: 28 },
  { specialty: "Dermatology", count: 25 },
];

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Performance Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Referrals Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Referrals Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={referralData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="referrals"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Referral Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-[300px]">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                {statusData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {entry.status} ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Referring Specialties */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top Referring Specialties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialtyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="specialty" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
