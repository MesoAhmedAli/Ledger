
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Lightbulb } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { PREDEFINED_EXPENSE_CATEGORIES } from "@/config/expense-categories";
import { smartCategorization, type SmartCategorizationInput } from "@/ai/flows/smart-categorization";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db, auth } from "@/lib/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

const expenseSchema = z.object({
  date: z.date({
    required_error: "Expense date is required.",
  }),
  description: z.string().min(1, "Description is required.").max(200, "Description should not exceed 200 characters."),
  amount: z.coerce.number().positive({ message: "Amount must be a positive number." }),
  category: z.string().min(1, "Category is required."),
  vendor: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

export function ExpenseForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuggestingCategories, setIsSuggestingCategories] = React.useState(false);
  const [suggestedCategories, setSuggestedCategories] = React.useState<string[]>([]);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: "",
      vendor: "",
      date: new Date(), // Default to today's date
    },
  });

  async function onSubmit(data: ExpenseFormValues) {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to add an expense.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "expenses"), {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      toast({
        title: "Expense Added",
        description: `Expense "${data.description}" for $${data.amount} has been recorded.`,
      });
      form.reset({
        description: "",
        amount: 0,
        category: "",
        vendor: "",
        date: new Date(),
      });
      setSuggestedCategories([]);
    } catch (error) {
      console.error("Error adding expense:", error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSuggestCategories() {
    const description = form.getValues("description");
    if (!description.trim()) {
      toast({
        title: "Description needed",
        description: "Please enter a description to get category suggestions.",
        variant: "destructive",
      });
      return;
    }

    setIsSuggestingCategories(true);
    setSuggestedCategories([]);
    try {
      const input: SmartCategorizationInput = { expenseText: description };
      const result = await smartCategorization(input);
      if (result.suggestedCategories && result.suggestedCategories.length > 0) {
        setSuggestedCategories(result.suggestedCategories);
        const firstSuggestionAsPredefined = PREDEFINED_EXPENSE_CATEGORIES.find(
          cat => cat.label.toLowerCase() === result.suggestedCategories[0].toLowerCase() ||
                 cat.value.toLowerCase() === result.suggestedCategories[0].toLowerCase()
        );
        if (firstSuggestionAsPredefined) {
          form.setValue("category", firstSuggestionAsPredefined.value, { shouldValidate: true });
        }
         toast({
          title: "Categories Suggested",
          description: "Pick a suggestion or choose from the list.",
        });
      } else {
        toast({
          title: "No Suggestions",
          description: "Could not find specific categories. Please select one manually.",
        });
      }
    } catch (error) {
      console.error("Error suggesting categories:", error);
      toast({
        title: "Suggestion Error",
        description: "Failed to get category suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSuggestingCategories(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Expense</CardTitle>
        <CardDescription>Fill in the details of your business expense.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Expense</FormLabel>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Lunch meeting with client, Office printer paper"
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel htmlFor="category">Category</FormLabel>
              <div className="flex items-start gap-2">
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger id="category">
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
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleSuggestCategories}
                  disabled={isSuggestingCategories || !form.watch("description")}
                  className="shrink-0 mt-0.5" 
                  aria-label="Suggest Categories"
                >
                  {isSuggestingCategories ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Lightbulb className="h-4 w-4" />
                  )}
                </Button>
              </div>
               {suggestedCategories.length > 0 && (
                <div className="pt-2 space-x-2 space-y-2">
                  <span className="text-sm text-muted-foreground">Suggestions:</span>
                  {suggestedCategories.map((suggestion, index) => {
                    const predefinedCategory = PREDEFINED_EXPENSE_CATEGORIES.find(
                      cat => cat.label.toLowerCase() === suggestion.toLowerCase() ||
                             cat.value.toLowerCase() === suggestion.toLowerCase()
                    );
                    return (
                      <Badge
                        key={index}
                        variant={form.getValues("category") === predefinedCategory?.value ? "default" : "outline"}
                        className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          if (predefinedCategory) {
                            form.setValue("category", predefinedCategory.value, { shouldValidate: true });
                          } else {
                             toast({ title: "Custom Category", description: `"${suggestion}" is not a predefined category. Select "Other" or add it if functionality exists.`});
                          }
                        }}
                      >
                        {suggestion}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} step="0.01" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vendor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Amazon, Staples" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting || isSuggestingCategories || !user} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Expense"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

    