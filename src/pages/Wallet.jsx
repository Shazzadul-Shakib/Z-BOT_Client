import AddNewWalletCard from "@/components/pages/finance/AddNewWalletCard";
import WalletCard from "@/components/pages/finance/WalletCard";
import useToggle from "@/hooks/useToggle";
import AddNewWalletModal from "@/components/modals/AddNewWallet";
import { useSelector } from "react-redux";
import { useGetAllWalletQuery } from "@/redux/api/finance-api";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import DnaLoader from "@/components/loader/loader";
import { EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";

const Wallet = () => {
  const { user } = useSelector((state) => state.user);

  const { data: allWalletsResponse, isLoading } = useGetAllWalletQuery(
    user._id
  );
  const [isWalletCardOpen, toggleWalletCardOn, toggleWalletCardOff] =
    useToggle();

  if (isLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }

  const allWallets = allWalletsResponse?.data ?? [];
  const sortedWallets = allWallets?.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div>
      <div className=" flex justify-end items-center mb-4 pr-4">
        <Link to="manage-wallets">
          <EllipsisVertical className=" hover:bg-primary rounded-full hover:text-background transition-colors duration-200 cursor-pointer" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6 ">
        {sortedWallets?.map((wallet) => (
          <WalletCard key={wallet._id} Info={wallet} />
        ))}
        <AddNewWalletCard
          bName={"Add New Wallet"}
          isOpen={isWalletCardOpen}
          toggleOn={toggleWalletCardOn}
          toggleOff={toggleWalletCardOff}
          ModalCard={AddNewWalletModal}
        />
      </div>
    </div>
  );
};

export default Wallet;
