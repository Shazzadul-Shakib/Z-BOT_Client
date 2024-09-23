import DnaLoader from "@/components/loader/loader";
import AddNewDebtModal from "@/components/modals/AddNewDebtModalCard";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import useToggle from "@/hooks/useToggle";
import {
  useDeleteSingleDebtMutation,
  useGetAllDebtQuery,
  useUpdateDebtPaidStatusMutation,
} from "@/redux/api/finance-api";
import { PlusCircle } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const Debt = () => {
  const { user } = useSelector((state) => state.user);
  const { data: allDebtResponse, isLoading } = useGetAllDebtQuery(user._id);
  const [updateDebtPaidStatus] = useUpdateDebtPaidStatusMutation();
  const [deleteSingleDebt] = useDeleteSingleDebtMutation();
  const [
    isAddNewDebtModalOpen,
    toggleAddNewDebtModalOn,
    toggleAddNewDebtModalOff,
  ] = useToggle();

  

  const alldebts = allDebtResponse?.data ?? [];

  const handleToggleCheck = async (debtId, currentStatus) => {
    const data = { debtPaid: !currentStatus };
    await updateDebtPaidStatus({ ownerUserId: user._id, debtId, data });
   
  };

  if (isLoading ) {
    return <ModalBody modal={<DnaLoader />} />;
  }

  return (
    <div>
      <Card>
        <CardHeader className=" flex-row justify-between mr-0 md:mr-4 ">
          <div>
            <CardTitle className="text-sm font-normal md:text-2xl md:font-medium">
              Debt History
            </CardTitle>
            <CardDescription className="mt-2 text-xs md:text-base">
              Manage your Debt and view their status.
            </CardDescription>
          </div>
          <div>
            <Button
              onClick={toggleAddNewDebtModalOn}
              size="sm"
              className="h-8 gap-2 rounded"
            >
              <PlusCircle className="h-5 w-5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-bold">
                Add New Debt
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-[calc(100dvh-215px)] overflow-y-auto hide-scrollbar">
          {alldebts?.length === 0 ? (
            <div className="h-full w-full flex justify-center items-center">
              <h1 className=" text-2xl">No debt found!</h1>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>

                  <TableHead className="hidden md:table-cell">
                    Received at
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alldebts.map((debt) => (
                  <TableRow key={debt._id}>
                    <TableCell className="font-normal md:font-medium">
                      <Checkbox
                        id={`termsDebt`}
                        checked={debt?.debtPaid}
                        onCheckedChange={async() => {
                         await handleToggleCheck(debt?._id, debt?.debtPaid);
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-normal md:font-medium">
                      <Label htmlFor={`termsDebt`}>{debt.debtOwnerName}</Label>
                    </TableCell>
                    <TableCell>${debt.debtAmount}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {debt.debtDate}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            className="rounded"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded">
                          <DropdownMenuItem
                            onClick={async () => {
                              await deleteSingleDebt({
                                ownerUserId: user._id,
                                debtId: debt._id,
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
          )}
        </CardContent>
      </Card>

      {/* Expense history */}
      {isAddNewDebtModalOpen && (
        <ModalBody
          modal={<AddNewDebtModal onClose={toggleAddNewDebtModalOff} />}
        />
      )}
    </div>
  );
};

export default Debt;
