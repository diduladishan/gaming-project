"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusPopup from "./OrderStatusPopup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import OrderDetailPopupCopy from "./OrderDetailPopup copy";
import { useOrderContext } from "@/context/OrderContext";
import { IoIosArrowForward } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface OrderItem {
  price: number;
  quantity: number;
  game: {
    cardImage: string;
    displayName: string;
    id: string;
    regularPrice: number;
  };
}

/* export type AllOrdersNew = {
  createdAt: string;
  id: string;
  order_id: string;
  username: string;
  totalAmount: string;
  status: string;
  items: OrderItem[]; // Include items property
}; */

export type AllOrdersNew1 = {
  createdAt: string;
  id: string;
  order_id: string;
  username: string;
  firstName: string;
  lastName: string;
  totalAmount: number;
  status: string;
  products: OrderItem[]; // Include items property
};

export const columns: ColumnDef<AllOrdersNew1>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Order ID
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "user.username",
    header: "Username",
    cell: ({ row }) => {
      return (
        <div className="flex">
          {row.original.firstName + " " + row.original.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="relative">{row.original.createdAt.split("T")[0]}</div>
      );
    },
  },

  {
    accessorKey: "totalAmount",
    header: "Order Total",
    cell: ({ row }) => {
      return (
        <div className="flex text-end">
          {Math.max(row.original.totalAmount, 0).toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const [showPopup, setShowPopup] = useState(false);
      const [status, setStatus] = useState(row.original.status);
      const handleStatusClick = () => {
        setShowPopup(true);
      };
      const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        row.original.status = newStatus; // Update the row's status value
      };
      return (
        // <div className="relative">
        //   <button
        //     onClick={handleStatusClick}
        //     className="text-blue-500 underline"
        //   >
        //     {status}
        //   </button>
        //   {showPopup && (
        //     <StatusPopup
        //       initialStatus={status}
        //       id={row.original.id}
        //       onSave={handleStatusChange}
        //       onClose={() => setShowPopup(false)}
        //     />
        //   )}
        // </div>

        <Popover open={showPopup}>
          <PopoverTrigger
            onClick={() => setShowPopup(true)}
            className="w-[12ch] capitalize hover:opacity-85"
          >
            <div className="flex items-center justify-between">
              <p>{status}</p>
              <IoIosArrowForward className="text-[#00FFA1]" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[14em] bg-black/40 border-[#0D6D49] text-white backdrop-blur-md font-primaryFont">
            <StatusPopup
              initialStatus={status}
              id={row.original.id}
              onSave={handleStatusChange}
              onClose={() => setShowPopup(false)}
            />
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const [selectedOrder, setSelectedOrder] = useState<AllOrdersNew1 | null>(
        null
      );
      const [isViewModalOpen, setIsViewModalOpen] = useState(false);

      const handleViewOrder = (order: AllOrdersNew1) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
      };

      const {
        getAllOrders,
        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        totalPages,
        setTotalPages,
        loading,
        deleteOrderById,
        setReloadOrders,
      } = useOrderContext();

      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

      const handleDeleteClick = (orderId: string) => {
        setOrderToDelete(orderId);
        setIsDeleteDialogOpen(true); // Open the dialog when the delete button is clicked
      };

      const handleDeleteOrder = () => {
        if (orderToDelete) {
          deleteOrderById(orderToDelete);
          setIsDeleteDialogOpen(false); // Close the dialog after deletion
        }
      };

      return (
        <div className="flex space-x-2">
          {/* <button
            className="hover:opacity-80 transition-opacity duration-100"
            onClick={() => {
              deleteOrderById(row.original.id);
              setReloadOrders((prev) => !prev);
            }}
          >
            Delete
          </button> */}

          <button
            className="hover:opacity-80 transition-opacity duration-100"
            onClick={() => handleViewOrder(row.original)}
          >
            <FaEye />
          </button>

          <button
            className="hover:opacity-80 transition-opacity duration-100"
            onClick={() => handleDeleteClick(row.original.id)} // Set order ID for deletion
          >
            <IoTrash />
          </button>

          {/* Delete pop up when click IoTrash button */}
          {/* Shadcn Dialog for Delete Confirmation */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="border-none">
              <div className="fixed inset-0 bg-black/80 flex justify-center items-center text-[9px] md:text-[10px] 2xl:text-[11px] text-center">
                <div className="relative bg-gradient-to-br from-black from-15% to-[#0d6d4a65] p-[4em] rounded-md border border-t-[1em] border-[#0D6D49]">
                  <div className="size-[6.5em] absolute top-0 left-0 right-0 mx-auto -translate-y-[60%] bg-[#0D6D49] flex items-center justify-center rounded-full"></div>
                  <h2 className="text-[1.8em] font-semibold text-white">
                    Delete Order
                  </h2>
                  <p className="mt-[2em] mb-[2.5em] w-[40ch] text-white">
                    Deleting this order will remove it from the system
                    permanently. This cannot be undone.
                  </p>
                  <div className="flex gap-x-[3em] justify-center font-bold">
                    <button
                      className="py-[1em] px-[1em] border border-[#00FFA1] rounded-sm flex-grow w-full hover:opacity-90 transition-opacity duration-100 font-bold text-white"
                      onClick={() => setIsDeleteDialogOpen(false)} // Close the dialog on Cancel
                    >
                      Cancel
                    </button>
                    <button
                      className="py-[1em] px-[1em] bg-[#AF1515] rounded-sm flex-grow w-full hover:opacity-90 transition-opacity duration-100 font-bold text-white"
                      onClick={handleDeleteOrder} // Handle order deletion
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <OrderDetailPopupCopy
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            products={row.original.products}
            order={row.original}
          />
        </div>
      );
    },
  },

  /* {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }, */
];
