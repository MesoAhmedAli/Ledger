
"use client";

import * as React from "react";
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreditCard, PlusCircle, Loader2, AlertTriangle } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase/config";
import { collection, query, where, onSnapshot, orderBy, Timestamp, doc, deleteDoc } from "firebase/firestore";
import { format } from 'date-fns';
import { PREDEFINED_EXPENSE_CATEGORIES } from "@/config/expense-categories";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Expense {
  id: string;
  date: Timestamp | Date; // Firestore timestamp or Date object
  description: string;
  amount: number;
  category: string;
  vendor?: string;
  createdAt: Timestamp;
  userId: string;
}

export default function ExpensesPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [isLoadingExpenses, setIsLoadingExpenses] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (authLoading) {
      setIsLoadingExpenses(true);
      return;
    }
    if (!user) {
      setIsLoadingExpenses(false);
      // Potentially redirect to login or show a message
      return;
    }

    setIsLoadingExpenses(true);
    const expensesCol = collection(db, "expenses");
    const q = query(
      expensesCol, 
      where("userId", "==", user.uid), 
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const fetchedExpenses = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Ensure date is a Date object for formatting, Firestore Timestamps have toDate()
          date: (doc.data().date as Timestamp)?.toDate ? (doc.data().date as Timestamp).toDate() : new Date(doc.data().date)
        } as Expense));
        setExpenses(fetchedExpenses);
        setIsLoadingExpenses(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching expenses:", err);
        setError("Failed to load expenses. Please try again.");
        setIsLoadingExpenses(false);
        toast({
          variant: "destructive",
          title: "Error fetching expenses",
          description: err.message,
        });
      }
    );

    return () => unsubscribe();
  }, [user, authLoading, toast]);
  
  const getCategoryLabel = (value: string) => {
    const category = PREDEFINED_EXPENSE_CATEGORIES.find(cat => cat.value === value);
    return category ? category.label : value;
  };

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      await deleteDoc(doc(db, "expenses", expenseId));
      toast({
        title: "Expense Deleted",
        description: "The expense has been successfully deleted.",
      });
    } catch (err: any) {
      console.error("Error deleting expense: ", err);
      toast({
        variant: "destructive",
        title: "Error Deleting Expense",
        description: err.message || "Could not delete the expense.",
      });
    }
  };


  if (authLoading || isLoadingExpenses) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && !authLoading) {
     return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed shadow-sm p-8 min-h-[calc(100vh-10rem)] bg-card">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold tracking-tight text-card-foreground">Access Denied</h2>
        <p className="text-muted-foreground max-w-md text-lg text-center mt-2">
          Please log in to view and manage your expenses.
        </p>
        <Button asChild className="mt-6">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-destructive shadow-sm p-8 min-h-[calc(100vh-10rem)] bg-card">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold tracking-tight text-destructive">{error}</h2>
         <Button onClick={() => window.location.reload()} className="mt-4">Try Again</Button>
      </div>
    );
  }


  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-0.5 sm:p-4 md:p-8 pt-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl">My Expenses</CardTitle>
                    <CardDescription>
                    Log and categorize all your business expenses.
                    </CardDescription>
                </div>
            </div>
            <Button asChild>
              <Link href="/expenses/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Expense
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.length === 0 && !isLoadingExpenses && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No expenses recorded yet. Add your first expense!
                    </TableCell>
                  </TableRow>
                )}
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      {expense.date instanceof Date ? format(expense.date, 'PP') : 
                       (expense.date as Timestamp)?.toDate ? format((expense.date as Timestamp).toDate(), 'PP') : 'Invalid Date'}
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{expense.description}</TableCell>
                    <TableCell>{getCategoryLabel(expense.category)}</TableCell>
                    <TableCell>{expense.vendor || 'N/A'}</TableCell>
                    <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this expense record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteExpense(expense.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          {expenses.length > 0 && (
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                Showing {expenses.length} expense(s).
                </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </ScrollArea>
  );
}

    