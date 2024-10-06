import DnaLoader from "@/components/loader/loader";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllWalletQuery } from "@/redux/api/finance-api";
import {  MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const ManageWallet = () => {
     const { user } = useSelector((state) => state.user);

     const { data: allWalletsResponse, isLoading } = useGetAllWalletQuery(
       user._id
     );

     if (isLoading) {
       return <ModalBody modal={<DnaLoader />} />;
     }

     const allWallets = allWalletsResponse?.data ?? [];
     console.log(allWallets)
     const sortedWallets = allWallets?.slice().sort((a, b) => {
       return new Date(b.createdAt) - new Date(a.createdAt);
     });
    return (
      <div>
        <Card>
          <CardHeader className=" flex-row justify-between mr-0 md:mr-4 ">
            <div>
              <CardTitle className="text-sm font-normal md:text-2xl md:font-medium">
                Manage Wallets
              </CardTitle>
              <CardDescription className="mt-2 text-xs md:text-base">
                Manage your wallets and view their status.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-[calc(100dvh-215px)] overflow-y-auto hide-scrollbar">
            {sortedWallets?.length === 0 ? (
              <div className="h-full w-full flex justify-center items-center">
                <h1 className=" text-2xl">No wallets found!</h1>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Wallet name</TableHead>
                    <TableHead>Initial balance</TableHead>
                    <TableHead>Current balance</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedWallets?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-normal md:font-medium">
                        {item.walletName}
                      </TableCell>
                      <TableCell>${item.initialBalance}</TableCell>
                      <TableCell>${item.walletBalance}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(item.createdAt).toLocaleDateString()}
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
                            //   onClick={async () => {
                            //     await deleteSingleSavings({
                            //       ownerUserId: user._id,
                            //       savingsId: item._id,
                            //       data: {
                            //         walletId: item.walletId,
                            //         addableAmount: item.expenseAmount,
                            //       },
                            //     });
                            //   }}
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
      </div>
    );
};

export default ManageWallet;