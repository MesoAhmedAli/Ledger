
"use client"; // Required for useRouter and useEffect

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, FileText, Users, ArrowUpRight, ArrowDownRight, Activity, BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const kpiData = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign, trend: "up" as const, note: "from last month" },
  { title: "Total Expenses", value: "$12,105.32", change: "-5.3%", icon: TrendingUp, trend: "down" as const, note: "from last month" },
  { title: "Pending Invoices", value: "12", subValue: "$5,600.00", icon: FileText, note: "outstanding" },
  { title: "Active Clients", value: "27", change: "+3", icon: Users, trend: "up" as const, note: "since last month" },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Ledger Lite</h1>
          <p className="text-muted-foreground">
            Here's a quick overview of your financial status.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/sales/new">Add Sale</Link>
          </Button>
          <Button asChild>
            <Link href="/expenses/new">Add Expense</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((item) => (
          <Card key={item.title} className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              {item.subValue && <p className="text-xs text-muted-foreground">{item.subValue}</p>}
              {item.change && (
                <div className="flex items-center text-xs">
                  {item.trend === "up" ? <ArrowUpRight className="h-4 w-4 text-green-500" /> : <ArrowDownRight className="h-4 w-4 text-red-500" />}
                  <span className={`ml-1 ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>{item.change}</span>
                  <span className="ml-1 text-muted-foreground">{item.note}</span>
                </div>
              )}
              {!item.change && item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Overview of your latest financial activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md">
              <Activity className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No recent transactions to display.</p>
              <Button variant="link" asChild className="mt-2">
                <Link href="/ledger">View Full Ledger</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Cash Flow Snapshot</CardTitle>
            <CardDescription>Monthly income vs. expenses.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md">
              <BarChart3 className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Cash flow chart coming soon.</p>
              <Button variant="link" asChild className="mt-2">
                <Link href="/cash-flow">View Cash Flow Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
