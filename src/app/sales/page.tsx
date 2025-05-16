
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const sampleSales = [
  { id: 'SALE-2024-001', date: '2024-07-01', customerName: 'John Doe', items: '2x Product A, 1x Product B', amount: '275.00', paymentMethod: 'Credit Card' },
  { id: 'SALE-2024-002', date: '2024-07-01', customerName: 'Jane Smith', items: '5x Service X', amount: '500.00', paymentMethod: 'Bank Transfer' },
  { id: 'SALE-2024-003', date: '2024-07-02', customerName: 'Walk-in Customer', items: '1x Product C', amount: '49.99', paymentMethod: 'Cash' },
  { id: 'SALE-2024-004', date: '2024-07-03', customerName: 'Robert Brown', items: '10x Product A', amount: '1250.00', paymentMethod: 'Credit Card' },
  { id: 'SALE-2024-005', date: '2024-07-03', customerName: 'Emily White', items: '3x Service Y, 1x Product D', amount: '320.50', paymentMethod: 'PayPal' },
];

export default function SalesPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-0.5 sm:p-4 md:p-8 pt-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl">Daily Sales Records</CardTitle>
                    <CardDescription>
                    Manage and input your daily sales. Track revenue and generate reports.
                    </CardDescription>
                </div>
            </div>
            <Button asChild>
              <Link href="/sales/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Sale
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sale ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items/Services</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.customerName}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{sale.items}</TableCell>
                    <TableCell className="text-right">${sale.amount}</TableCell>
                    <TableCell>{sale.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/sales/details/${sale.id.toLowerCase()}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                 {sampleSales.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center h-24">
                        No sales records yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
           {sampleSales.length > 0 && (
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                Showing {sampleSales.length} of {sampleSales.length} sales records.
                </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </ScrollArea>
  );
}

