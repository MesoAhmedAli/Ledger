
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, PackagePlus } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const inventoryItemSchema = z.object({
  itemName: z.string().min(1, "Item name is required."),
  sku: z.string().min(1, "SKU is required.").max(50, "SKU too long"),
  quantity: z.coerce.number().int().min(0, "Quantity cannot be negative."),
  unitCost: z.coerce.number().min(0, "Unit cost cannot be negative.").optional(),
  salePrice: z.coerce.number().min(0, "Sale price cannot be negative."),
  category: z.string().optional(),
  description: z.string().optional(),
});

type InventoryItemFormValues = z.infer<typeof inventoryItemSchema>;

const sampleCategories = ["Tools", "Lighting", "Safety Gear", "Consumables", "Electronics", "Hardware", "Other"];

export default function AddInventoryItemPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<InventoryItemFormValues>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      itemName: "",
      sku: "",
      quantity: 0,
      unitCost: 0,
      salePrice: 0,
      category: "",
      description: "",
    },
  });

  async function onSubmit(data: InventoryItemFormValues) {
    setIsSubmitting(true);
    console.log("New Inventory Item Data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Item Added to Inventory",
      description: `${data.itemName} (SKU: ${data.sku}) has been added.`,
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
              <PackagePlus className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Add New Inventory Item</CardTitle>
            </div>
            <CardDescription>Enter the details for a new item to add to your inventory.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Heavy Duty Wrench Set" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                        <FormControl><Input placeholder="e.g., HDW-S-001" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Quantity</FormLabel>
                        <FormControl><Input type="number" placeholder="0" {...field} min="0" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="unitCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Cost (Optional)</FormLabel>
                        <FormControl><Input type="number" placeholder="0.00" {...field} step="0.01" min="0"/></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Price</FormLabel>
                        <FormControl><Input type="number" placeholder="0.00" {...field} step="0.01" min="0"/></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleCategories.map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, '_')}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl><Textarea placeholder="Brief description of the item..." {...field} className="resize-none" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding Item...</>
                  ) : (
                    "Add Item to Inventory"
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

