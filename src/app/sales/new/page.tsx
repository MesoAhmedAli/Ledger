
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, DollarSign } from "lucide-react";

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


const saleSchema = z.object({
  saleDate: z.date({ required_error: "Sale date is required." }),
  customerName: z.string().optional(),
  itemsSold: z.string().min(1, "Please describe items/services sold."),
  totalAmount: z.coerce.number().positive("Total amount must be a positive number."),
  paymentMethod: z.string().min(1, "Payment method is required."),
  notes: z.string().optional(),
});

type SaleFormValues = z.infer<typeof saleSchema>;

const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "PayPal", "Other"];

export default function NewSalePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      customerName: "",
      itemsSold: "",
      totalAmount: 0,
      paymentMethod: "",
      notes: "",
    },
  });

  async function onSubmit(data: SaleFormValues) {
    setIsSubmitting(true);
    console.log("New Sale Data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Sale Recorded",
      description: `Sale of $${data.totalAmount} has been recorded successfully.`,
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
              <DollarSign className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Add New Sale</CardTitle>
            </div>
            <CardDescription>Record the details of a new sale transaction.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="saleDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Sale</FormLabel>
                      <DatePicker value={field.value} onChange={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name (Optional)</FormLabel>
                      <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="itemsSold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Items/Services Sold</FormLabel>
                      <FormControl><Textarea placeholder="e.g., 2x Product A, 1x Service B" {...field} className="resize-none" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="totalAmount"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Total Amount</FormLabel>
                        <FormControl><Input type="number" placeholder="0.00" {...field} step="0.01" min="0" /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {paymentMethods.map((method) => (
                                <SelectItem key={method} value={method}>
                                {method}
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
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl><Textarea placeholder="Any additional notes about the sale..." {...field} className="resize-none" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Recording Sale...</>
                  ) : (
                    "Record Sale"
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
