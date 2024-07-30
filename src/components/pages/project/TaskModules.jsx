import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { MoreVertical, PlusCircle } from "lucide-react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  }
];

const TaskModules = () => {
  return (
    <Card className="h-[80dvh] overflow-y-auto hide-scrollbar">
      <Table>
        <TableHeader className="bg-primary-foreground">
          <TableRow>
            <TableHead className="w-[100px]">STATUS</TableHead>
            <TableHead>TASKS</TableHead>
            <TableHead className="hidden md:table-cell">DATE</TableHead>
            <TableHead className="text-right">MANAGE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">
                <Checkbox id={`terms-${invoice.invoice}`} />
              </TableCell>
              <TableCell className="font-medium">
                <Label htmlFor={`terms-${invoice.invoice}`}>
                  Details about the modular task to be done.
                </Label>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                November 23, 2023
              </TableCell>
              <TableCell className="font-medium text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="secondary" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add New Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskModules;
