
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
import { Archive, PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const sampleInventoryItems = [
  { id: 'ITEM-001', name: 'Heavy Duty Wrench Set', sku: 'HDW-S-001', quantity: 25, unitCost: '45.00', salePrice: '79.99', category: 'Tools' },
  { id: 'ITEM-002', name: 'LED Work Light - Rechargeable', sku: 'LWL-R-005', quantity: 50, unitCost: '22.50', salePrice: '39.95', category: 'Lighting' },
  { id: 'ITEM-003', name: 'Safety Gloves - Large', sku: 'SGL-L-010', quantity: 120, unitCost: '5.75', salePrice: '12.50', category: 'Safety Gear' },
  { id: 'ITEM-004', name: 'Industrial Cleaner (1 Gallon)', sku: 'ICL-G-002', quantity: 30, unitCost: '15.00', salePrice: '24.99', category: 'Consumables' },
  { id: 'ITEM-005', name: 'Wireless Barcode Scanner', sku: 'WBS-X-100', quantity: 15, unitCost: '110.00', salePrice: '199.00', category: 'Electronics' },
];

export default function InventoryPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-0.5 sm:p-4 md:p-8 pt-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-4">
                <Archive className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl">Inventory Management</CardTitle>
                    <CardDescription>
                    Track product levels, item movements, and stock valuation.
                    </CardDescription>
                </div>
            </div>
            <Button asChild>
              <Link href="/inventory/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Sale Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleInventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.salePrice}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/inventory/edit/${item.id.toLowerCase()}`}>View/Edit</Link> 
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {sampleInventoryItems.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                        No inventory items yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
           {sampleInventoryItems.length > 0 && (
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                Showing {sampleInventoryItems.length} of {sampleInventoryItems.length} items.
                </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </ScrollArea>
  );
}
