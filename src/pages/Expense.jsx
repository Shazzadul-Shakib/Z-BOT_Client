import AddNewExpenseModal from "@/components/modals/AddNewExpenseModal";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useToggle from "@/hooks/useToggle";
import { PlusCircle } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

const Expense = () => {
  const [
    isAddNewExpenseModalOpen,
    toggleAddNewExpenseModalOn,
    toggleAddNewExpenseModalOff,
  ] = useToggle();
  return (
    <div>
      {isAddNewExpenseModalOpen && (
        <ModalBody
          modal={<AddNewExpenseModal onClose={toggleAddNewExpenseModalOff} />}
        />
      )}

      {/* Expense history */}

      <Card>
        <CardHeader className=" flex-row justify-between mr-4 ">
          <div>
            <CardTitle>Expense History - September 2024</CardTitle>
            <CardDescription className="mt-2">
              Manage your Expenses and view their status.
            </CardDescription>
          </div>
          <div >
            <Button
              onClick={toggleAddNewExpenseModalOn}
              size="sm"
              className="h-8 gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add New Expense
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>

                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Laser Lemonade Machine
                </TableCell>
                <TableCell>
                  <Badge className="px-4 py-2" variant="outline">Tuition</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">Food</TableCell>
                <TableCell className="hidden md:table-cell">$499.99</TableCell>
                <TableCell className="hidden md:table-cell">
                  Sept 12 , 2024
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expense;
