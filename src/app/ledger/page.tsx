
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";

const ledgerEntries = [
  { id: '1', date: '2024-07-01', account: 'Cash', description: 'Initial cash deposit from owner', debit: '10000.00', credit: '', balance: '10000.00' },
  { id: '2', date: '2024-07-01', account: 'Owner Equity', description: 'Initial cash deposit from owner', debit: '', credit: '10000.00', balance: '10000.00' },
  { id: '3', date: '2024-07-02', account: 'Office Supplies', description: 'Purchased pens and paper from Staples', debit: '75.50', credit: '', balance: '9924.50' },
  { id: '4', date: '2024-07-02', account: 'Cash', description: 'Payment for office supplies', debit: '', credit: '75.50', balance: '9924.50' },
  { id: '5', date: '2024-07-03', account: 'Accounts Receivable', description: 'Invoice #INV-001 for Client A', debit: '1200.00', credit: '', balance: '11124.50' },
  { id: '6', date: '2024-07-03', account: 'Sales Revenue', description: 'Service provided to Client A', debit: '', credit: '1200.00', balance: '11124.50' },
  { id: '7', date: '2024-07-05', account: 'Rent Expense', description: 'Monthly office rent', debit: '1500.00', credit: '', balance: '9624.50' },
  { id: '8', date: '2024-07-05', account: 'Cash', description: 'Payment for monthly office rent', debit: '', credit: '1500.00', balance: '9624.50' },
  { id: '9', date: '2024-07-10', account: 'Cash', description: 'Received payment for INV-001', debit: '1200.00', credit: '', balance: '10824.50' },
  { id: '10', date: '2024-07-10', account: 'Accounts Receivable', description: 'Payment received for INV-001', debit: '', credit: '1200.00', balance: '10824.50' },
];

// Helper to calculate running balance (simplified for this example)
let currentBalance = 0;
const entriesWithBalance = ledgerEntries.map(entry => {
  if (entry.debit) {
    currentBalance += parseFloat(entry.debit);
  }
  if (entry.credit) {
    currentBalance -= parseFloat(entry.credit); // Note: This isn't standard double-entry balance calc, but for display.
                                                // True double entry would ensure debits = credits.
                                                // A proper ledger balance would be for specific accounts.
                                                // This is more like a cash account's running total if all were cash.
  }
  // For this example, we'll use the 'balance' field from the sample data if it exists,
  // otherwise, it would need a more complex calculation based on account types.
  return { ...entry, displayBalance: entry.balance };
});


export default function LedgerPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-0.5 sm:p-4 md:p-8 pt-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">General Ledger</CardTitle>
              <CardDescription>
                A comprehensive list of all financial transactions, sorted chronologically.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entriesWithBalance.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.account}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell className="text-right">{entry.debit}</TableCell>
                    <TableCell className="text-right">{entry.credit}</TableCell>
                    <TableCell className="text-right">{entry.displayBalance}</TableCell>
                  </TableRow>
                ))}
                {entriesWithBalance.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                        No ledger entries yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
