
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DollarSign, ArrowUpCircle, ArrowDownCircle, BarChart3, Repeat } from "lucide-react";

const cashFlowData = {
  totalInflow: 15231.89,
  totalOutflow: 9105.32,
  netCashFlow: 15231.89 - 9105.32,
  period: "This Month (July 2024)",
};

export default function CashFlowPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-0.5 sm:p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-6">
            <Repeat className="h-8 w-8 text-primary" />
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Cash Flow Analysis</h1>
                <p className="text-muted-foreground">
                Visualize your company's cash flow for {cashFlowData.period}.
                </p>
            </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inflow</CardTitle>
              <ArrowUpCircle className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${cashFlowData.totalInflow.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total cash received</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Outflow</CardTitle>
              <ArrowDownCircle className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${cashFlowData.totalOutflow.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total cash paid out</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
              <DollarSign className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${cashFlowData.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${cashFlowData.netCashFlow.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Inflow - Outflow</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Cash Flow Chart</CardTitle>
            <CardDescription>Monthly cash inflows and outflows overview.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-md p-8">
              <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">Cash Flow Chart Coming Soon</p>
              <p className="text-sm text-muted-foreground">Detailed visualization of your cash movements will be available here.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Cash Transactions</CardTitle>
            <CardDescription>A quick look at recent significant cash movements.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="text-center text-muted-foreground py-8">
                Detailed transaction list coming soon.
             </div>
          </CardContent>
        </Card>

      </div>
    </ScrollArea>
  );
}
