// Use server directive is required for Genkit Flows
'use server';

/**
 * @fileOverview This file contains the smart categorization flow for suggesting expense categories based on user-provided text.
 *
 * - smartCategorization - A function that takes expense text as input and returns a list of suggested categories.
 * - SmartCategorizationInput - The input type for the smartCategorization function.
 * - SmartCategorizationOutput - The return type for the smartCategorization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartCategorizationInputSchema = z.object({
  expenseText: z.string().describe('The text description of the expense.'),
});

export type SmartCategorizationInput = z.infer<typeof SmartCategorizationInputSchema>;

const SmartCategorizationOutputSchema = z.object({
  suggestedCategories: z
    .array(z.string())
    .describe('A list of suggested categories for the expense.'),
});

export type SmartCategorizationOutput = z.infer<typeof SmartCategorizationOutputSchema>;

export async function smartCategorization(
  input: SmartCategorizationInput
): Promise<SmartCategorizationOutput> {
  return smartCategorizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartCategorizationPrompt',
  input: {schema: SmartCategorizationInputSchema},
  output: {schema: SmartCategorizationOutputSchema},
  prompt: `Given the following expense description, suggest up to 5 categories that would be appropriate for this expense. Return the categories as a JSON array of strings.

Expense Description: {{{expenseText}}}`,
});

const smartCategorizationFlow = ai.defineFlow(
  {
    name: 'smartCategorizationFlow',
    inputSchema: SmartCategorizationInputSchema,
    outputSchema: SmartCategorizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
