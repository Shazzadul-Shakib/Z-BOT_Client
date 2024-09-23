import DnaLoader from "@/components/loader/loader";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  useDeleteSingleSavingsMutation,
  useGetAllSavingsQuery,
} from "@/redux/api/finance-api";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const Savings = () => {
  const { user } = useSelector((state) => state.user);
  const { data: allSavingsResponse, isLoading } = useGetAllSavingsQuery(
    user._id
  );
  const [deleteSingleSavings] = useDeleteSingleSavingsMutation();
  if (isLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }
  const allSavings = allSavingsResponse?.data;
  return (
    <div>
      <Card>
        <CardHeader className=" flex-row justify-between mr-0 md:mr-4 ">
          <div>
            <CardTitle className="text-sm font-normal md:text-2xl md:font-medium">
              Savings History - September 2024
            </CardTitle>
            <CardDescription className="mt-2 text-xs md:text-base">
              Manage your Savings and view their status.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[calc(100dvh-215px)] overflow-y-auto hide-scrollbar">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Wallet</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allSavings.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-normal md:font-medium">
                    {item.expenseName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className="px-4 py-2" variant="outline">
                      {item.walletName}
                    </Badge>
                  </TableCell>
                  <TableCell>${item.expenseAmount}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.expenseDate}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={async () => {
                            await deleteSingleSavings({
                              ownerUserId: user._id,
                              savingsId: item._id,
                              data: {
                                walletId: item.walletId,
                                addableAmount: item.expenseAmount,
                              },
                            });
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Savings;
