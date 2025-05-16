
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart3, FileSpreadsheet, PieChart, TrendingDown } from 'lucide-react';

const availableReports = [
  { title: "Profit and Loss Statement", description: "Summarizes revenues, costs, and expenses incurred during a specific period.", href: "/reports/profit-loss", icon: FileSpreadsheet, status: "coming_soon" },
  { title: "Balance Sheet", description: "Shows a snapshot of a company's assets, liabilities, and equity at a specific point in time.", href: "/reports/balance-sheet", icon: PieChart, status: "coming_soon" },
  { title: "Sales Tax Report", description: "Details sales tax collected and owed for a reporting period.", href: "/reports/sales-tax", icon: TrendingDown, status: "coming_soon" },
  { title: "Expense Report by Category", description: "Breaks down expenses by category over a selected period.", href: "/reports/expense-by-category", icon: BarChart3, status: "coming_soon" },
  // Add more reports here as they are developed
];

export default function ReportsPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-0.5 sm:p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-6">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Financial Reports</h1>
                <p className="text-muted-foreground">
                Generate various financial reports for analysis and decision-making.
                </p>
            </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableReports.map((report) => (
            <Card key={report.title} className="shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <report.icon className="h-8 w-8 text-primary mt-1" />
                <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription className="text-sm">{report.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow" /> {/* Spacer */}
              <CardContent className="pt-0"> {/* Footer content moved to CardContent for consistent padding */}
                {report.status === "coming_soon" ? (
                  <Button variant="outline" disabled className="w-full">
                    Coming Soon
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link href={report.href}>Generate Report</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
         <Card className="mt-8 shadow-sm">
            <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Need a specific report? Our custom report builder is under development.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md p-8">
                    <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Custom report generation feature coming soon!</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
