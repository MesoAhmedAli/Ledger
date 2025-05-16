
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, Building, Users, CreditCard, FileText, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-0.5 sm:p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-6">
            <Settings className="h-8 w-8 text-primary" />
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Application Settings</h1>
                <p className="text-muted-foreground">
                Configure company details, manage user accounts, and customize your experience.
                </p>
            </div>
        </div>

        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-6">
            <TabsTrigger value="company"><Building className="mr-2 h-4 w-4" />Company</TabsTrigger>
            <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" />Users</TabsTrigger>
            <TabsTrigger value="payments"><CreditCard className="mr-2 h-4 w-4" />Payments</TabsTrigger>
            <TabsTrigger value="invoices"><FileText className="mr-2 h-4 w-4" />Invoices</TabsTrigger>
            <TabsTrigger value="integrations"><Zap className="mr-2 h-4 w-4" />Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
                <CardDescription>Manage your company's information, address, and branding.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Ledger Lite Inc." />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="companyAddress">Address</Label>
                  <Input id="companyAddress" defaultValue="123 Finance St, Business City, TX 75001" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="companyLogo">Company Logo</Label>
                  <Input id="companyLogo" type="file" />
                  <p className="text-xs text-muted-foreground">Upload your company logo (PNG, JPG, max 2MB).</p>
                </div>
                <Button>Save Company Details</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Add, remove, or manage user roles and permissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md">
                  <Users className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">User management features are coming soon.</p>
                  <Button variant="outline" className="mt-4" disabled>Invite New User</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Payment Gateways</CardTitle>
                <CardDescription>Connect payment gateways to accept online payments for invoices.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md">
                  <CreditCard className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Payment gateway integrations (Stripe, PayPal) are coming soon.</p>
                   <Button variant="outline" className="mt-4" disabled>Connect Stripe</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Invoice Customization</CardTitle>
                <CardDescription>Customize the appearance of your invoices and default settings.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md">
                  <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Invoice template customization is coming soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect Ledger Lite with other services you use.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md">
                  <Zap className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Third-party integrations are planned for the future.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
