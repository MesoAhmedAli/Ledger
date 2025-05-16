
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PREDEFINED_EXPENSE_CATEGORIES } from "@/config/expense-categories";


const vendorBillSchema = z.object({
  vendorName: z.string().min(1, "Vendor name is required."),
  billDate: z.date({ required_error: "Bill date is required." }),
  dueDate: z.date().optional(),
  referenceNumber: z.string().optional(),
  amount: z.coerce.number().positive("Amount must be a positive number."),
  category: z.string().min(1, "Category is required."),
  description: z.string().optional(),
});

type VendorBillFormValues = z.infer<typeof vendorBillSchema>;

export default function NewVendorBillPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<VendorBillFormValues>({
    resolver: zodResolver(vendorBillSchema),
    defaultValues: {
      vendorName: "",
      referenceNumber: "",
      amount: 0,
      category: "",
      description: "",
    },
  });

  async function onSubmit(data: VendorBillFormValues) {
    setIsSubmitting(true);
    console.log("New Vendor Bill Data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Vendor Bill Added",
      description: `Bill from ${data.vendorName} for $${data.amount} has been recorded.`,
    });
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-0.5 sm:p-4 md:p-8 pt-6">
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ReceiptText className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Add New Vendor Bill</CardTitle>
            </div>
            <CardDescription>Record a new bill or invoice received from a vendor.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="vendorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Supplier X Ltd." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="billDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Bill Date</FormLabel>
                        <DatePicker value={field.value} onChange={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} />
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Due Date (Optional)</FormLabel>
                        <DatePicker value={field.value} onChange={field.onChange} disabled={(date) => date < (form.getValues("billDate") || new Date("1900-01-01"))} />
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="referenceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference / Invoice # (Optional)</FormLabel>
                      <FormControl><Input placeholder="e.g., INV-12345, Order #67890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl><Input type="number" placeholder="0.00" {...field} step="0.01" min="0"/></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {PREDEFINED_EXPENSE_CATEGORIES.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl><Textarea placeholder="Brief description of the bill..." {...field} className="resize-none" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding Bill...</>
                  ) : (
                    "Add Vendor Bill"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </ScrollArea>
  );
}
