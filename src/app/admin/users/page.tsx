import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, ShieldAlert, UserCheck } from "lucide-react";

export default function AdminUsersDirectoryPage() {
  const users = [
    {
      name: "Aarav Patel",
      email: "aarav.patel@student.aist.edu.in",
      role: "STUDENT",
      institution: "Apex Institute",
      status: "ACTIVE",
    },
    {
      name: "Dr. Anita Sharma",
      email: "dr.anita.sharma@aist.edu.in",
      role: "FACULTY",
      institution: "Apex Institute",
      status: "ACTIVE",
    },
    {
      name: "Prof. Vikram Malhotra",
      email: "vikram.malhotra@aist.edu.in",
      role: "COLLEGE_ADMIN",
      institution: "Apex Institute",
      status: "ACTIVE",
    },
    {
      name: "Siddharth Sen",
      email: "siddharth.sen@nexuscloud.io",
      role: "INDUSTRY_RECRUITER",
      institution: "Nexus Cloud",
      status: "ACTIVE",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.SUPER_ADMIN}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Global User Directory</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage roles, enforce permissions, and audit platform account identities.
          </p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users by email, name, or role..." className="pl-9 h-9 text-xs" />
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Registered Identities</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">User Name</TableHead>
                  <TableHead className="text-xs">Official Email</TableHead>
                  <TableHead className="text-xs">System Role</TableHead>
                  <TableHead className="text-xs">Associated Tenant</TableHead>
                  <TableHead className="text-xs">Account Status</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.email}>
                    <TableCell className="font-semibold text-xs text-foreground">{u.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{u.role}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{u.institution}</TableCell>
                    <TableCell>
                      <Badge variant="success" className="text-[10px]">{u.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Edit Role
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
