import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_COMPANIES } from "@/lib/db/demo-data";

export default function AdminCompaniesPage() {
  return (
    <DashboardShell requiredRole={UserRole.SUPER_ADMIN}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Enterprise Company Registry</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Corporate hiring organizations, recruitment licenses, and partnership verification.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Registered Corporate Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Company Name</TableHead>
                  <TableHead className="text-xs">Industry</TableHead>
                  <TableHead className="text-xs">Headquarters</TableHead>
                  <TableHead className="text-xs">Org Size</TableHead>
                  <TableHead className="text-xs">Verification</TableHead>
                  <TableHead className="text-xs text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEMO_COMPANIES.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell className="font-semibold text-xs text-foreground">{comp.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{comp.industry}</TableCell>
                    <TableCell className="text-xs">{comp.headquarters}</TableCell>
                    <TableCell className="text-xs">{comp.size}</TableCell>
                    <TableCell>
                      <Badge variant="success" className="text-[10px]">Verified</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Inspect
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
