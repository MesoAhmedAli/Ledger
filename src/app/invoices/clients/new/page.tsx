
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, FilePlus2 } from "lucide-react";

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

const invoiceSchema = z.object({
  clientName: z.string().min(1, "Client name is required."),
  clientEmail: z.string().email("Invalid email address.").optional().or(z.literal('')),
  invoiceDate: z.date({ required_error: "Invoice date is required." }),
  dueDate: z.date({ required_error: "Due date is required." }),
  invoiceNumber: z.string().min(1, "Invoice number is required."),
  items: z.array(z.object({
    description: z.string().min(1, "Item description is required."),
    quantity: z.coerce.number().positive("Quantity must be positive."),
    unitPrice: z.coerce.number().positive("Unit price must be positive."),
  })).min(1, "At least one item is required."),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export default function NewClientInvoicePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
      notes: "",
    },
  });

  const { fields, append, remove } = (form.control as any).fieldsAsArray ? (form.control as any) : { fields: form.watch('items'), append: () => {}, remove: () => {} }; // Fallback for type issue with useFieldArray if not directly used


  async function onSubmit(data: InvoiceFormValues) {
    setIsSubmitting(true);
    console.log("New Invoice Data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Invoice Created",
      description: `Invoice ${data.invoiceNumber} for ${data.clientName} has been created.`,
    });
    form.reset();
    // Reset items to one default item
     form.setValue('items', [{ description: "", quantity: 1, unitPrice: 0 }]);
    setIsSubmitting(false);
  }
  
  // Calculate total amount
  const watchedItems = form.watch("items");
  const totalAmount = React.useMemo(() => {
    return watchedItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  }, [watchedItems]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-0.5 sm:p-4 md:p-8 pt-6">
        <Card className="w-full max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FilePlus2 className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Create New Client Invoice</CardTitle>
            </div>
            <CardDescription>Fill in the details to generate a new invoice for a client.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Acme Corp" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Email (Optional)</FormLabel>
                        <FormControl><Input type="email" placeholder="e.g., contact@acme.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="invoiceDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Invoice Date</FormLabel>
                        <DatePicker value={field.value} onChange={field.onChange} disabled={(date) => date < new Date("1900-01-01")} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <DatePicker value={field.value} onChange={field.onChange} disabled={(date) => date < (form.getValues("invoiceDate") || new Date("1900-01-01"))} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormLabel>Invoice Items</FormLabel>
                  {fields.map((item: any, index: number) => (
                    <div key={item.id || index} className="grid grid-cols-12 gap-2 items-start border p-3 rounded-md">
                      <FormField
                        control={form.control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                          <FormItem className="col-span-12 md:col-span-5">
                            <FormLabel className="sr-only">Description</FormLabel>
                            <FormControl><Input placeholder="Item description" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="col-span-4 md:col-span-2">
                             <FormLabel className="sr-only">Qty</FormLabel>
                            <FormControl><Input type="number" placeholder="Qty" {...field} min="1" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.unitPrice`}
                        render={({ field }) => (
                          <FormItem className="col-span-4 md:col-span-2">
                            <FormLabel className="sr-only">Unit Price</FormLabel>
                            <FormControl><Input type="number" placeholder="Unit Price" {...field} step="0.01" min="0" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="col-span-4 md:col-span-2 flex items-center">
                        <p className="text-sm w-full text-right pt-2">
                          Total: $
                          {(
                            (form.watch(`items.${index}.quantity`) || 0) *
                            (form.watch(`items.${index}.unitPrice`) || 0)
                          ).toFixed(2)}
                        </p>
                      </div>
                       <div className="col-span-12 md:col-span-1 flex justify-end items-center pt-1">
                        {fields.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} className="text-destructive hover:text-destructive-foreground hover:bg-destructive">Remove</Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
                  >
                    Add Item
                  </Button>
                </div>
                
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Notes/Terms (Optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="e.g., Payment due within 30 days. Thank you for your business!" {...field} className="resize-none" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                
                <div className="text-right">
                    <p className="text-lg font-semibold">Total Amount: ${totalAmount.toFixed(2)}</p>
                </div>

              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</>
                  ) : (
                    "Create Invoice"
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
