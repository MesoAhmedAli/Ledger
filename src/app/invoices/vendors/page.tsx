
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
import { Package, PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const sampleVendorBills = [
  { id: 'BILL-2024-A01', vendorName: 'Supplier X Ltd.', billDate: '2024-06-25', dueDate: '2024-07-25', amount: '350.00', status: 'Paid', category: 'Office Supplies' },
  { id: 'BILL-2024-B02', vendorName: 'Cloud Services Co.', billDate: '2024-07-01', dueDate: '2024-07-15', amount: '99.99', status: 'Pending', category: 'Software Subscriptions' },
  { id: 'BILL-2024-C03', vendorName: 'Utilities United', billDate: '2024-07-05', dueDate: '2024-07-20', amount: '175.40', status: 'Pending', category: 'Utilities' },
  { id: 'BILL-2024-D04', vendorName: 'Marketing Agency Pro', billDate: '2024-06-15', dueDate: '2024-07-15', amount: '1200.00', status: 'Overdue', category: 'Marketing' },
  { id: 'BILL-2024-E05', vendorName: 'Logistics Partner', billDate: '2024-07-10', dueDate: '2024-08-09', amount: '875.00', status: 'Draft', category: 'Shipping' },
];

export default function VendorInvoicesPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-0.5 sm:p-4 md:p-8 pt-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl">Vendor Bills</CardTitle>
                    <CardDescription>
                    Keep track of bills from your vendors. Manage payments and due dates.
                    </CardDescription>
                </div>
            </div>
            <Button asChild>
              <Link href="/invoices/vendors/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Vendor Bill
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill # / Ref</TableHead>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Bill Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleVendorBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>{bill.vendorName}</TableCell>
                    <TableCell>{bill.billDate}</TableCell>
                    <TableCell>{bill.dueDate}</TableCell>
                    <TableCell className="text-right">${bill.amount}</TableCell>
                     <TableCell>
                        <span 
                            className={`px-2 py-1 text-xs font-semibold rounded-full
                            ${bill.status === 'Paid' ? 'bg-green-100 text-green-700' : ''}
                            ${bill.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${bill.status === 'Overdue' ? 'bg-red-100 text-red-700' : ''}
                            ${bill.status === 'Draft' ? 'bg-gray-100 text-gray-700' : ''}
                            `}
                        >
                            {bill.status}
                        </span>
                    </TableCell>
                    <TableCell>{bill.category}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/invoices/vendors/${bill.id.toLowerCase()}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {sampleVendorBills.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={8} className="text-center h-24">
                        No vendor bills yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          {sampleVendorBills.length > 0 && (
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                Showing {sampleVendorBills.length} of {sampleVendorBills.length} vendor bills.
                </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </ScrollArea>
  );
}
