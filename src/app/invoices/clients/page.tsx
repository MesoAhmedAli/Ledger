
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
import { FileText, PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const sampleInvoices = [
  { id: 'INV-2024-001', clientName: 'Tech Solutions Inc.', issueDate: '2024-07-01', dueDate: '2024-07-31', amount: '1500.00', status: 'Paid' },
  { id: 'INV-2024-002', clientName: 'Creative Designs Co.', issueDate: '2024-07-05', dueDate: '2024-08-04', amount: '850.50', status: 'Pending' },
  { id: 'INV-2024-003', clientName: 'Marketing Gurus LLC', issueDate: '2024-07-10', dueDate: '2024-08-09', amount: '2200.75', status: 'Overdue' },
  { id: 'INV-2024-004', clientName: 'Global Logistics Ltd.', issueDate: '2024-07-15', dueDate: '2024-08-14', amount: '3100.00', status: 'Draft' },
  { id: 'INV-2024-005', clientName: 'GreenScape Services', issueDate: '2024-07-20', dueDate: '2024-08-19', amount: '450.00', status: 'Pending' },
];

export default function ClientInvoicesPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-0.5 sm:p-4 md:p-8 pt-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl">Client Invoices</CardTitle>
                    <CardDescription>
                    Manage all your client invoices. Track payment statuses and send reminders.
                    </CardDescription>
                </div>
            </div>
            <Button asChild>
              <Link href="/invoices/clients/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Invoice
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.clientName}</TableCell>
                    <TableCell>{invoice.issueDate}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell className="text-right">${invoice.amount}</TableCell>
                    <TableCell>
                        <span 
                            className={`px-2 py-1 text-xs font-semibold rounded-full
                            ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : ''}
                            ${invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${invoice.status === 'Overdue' ? 'bg-red-100 text-red-700' : ''}
                            ${invoice.status === 'Draft' ? 'bg-gray-100 text-gray-700' : ''}
                            `}
                        >
                            {invoice.status}
                        </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/invoices/clients/${invoice.id.toLowerCase()}`}>View</Link>
                      </Button>
                      {/* Add more actions like Edit, Delete, Send Reminder later */}
                    </TableCell>
                  </TableRow>
                ))}
                {sampleInvoices.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center h-24">
                        No client invoices yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          {sampleInvoices.length > 0 && (
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                Showing {sampleInvoices.length} of {sampleInvoices.length} invoices.
                </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </ScrollArea>
  );
}
