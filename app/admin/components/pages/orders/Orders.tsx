import { useState } from "react";
import { AllOrdersNew, columns } from "./columns";
import { DataTable } from "./data-table";
import Addorders from "./AddOrders";
import EditAllOrdersPopup from "./editOrdersPopup";
import OrderDetailPopup from "./OrderDetailPopup";
import { ColumnDef } from "@tanstack/react-table";

import OrderDetailsTable from "./_components/Order-details-table";

function getInitialData(): AllOrdersNew[] {
  return [
    {
      id: "728ed52f",
      order_id: "#254GF45",
      date: "23/05/2024",
      username: "SteveSmith",
      order_total: "$40",
      status: "Approved",
    },

    {
      id: "728ed52f",
      order_id: "#254GF96",
      date: "12/01/2022",
      username: "RickyPonting",
      order_total: "$40",
      status: "Rejected",
    },
  ];
}

export default function Allorders() {
  const [orders, setorders] = useState<AllOrdersNew[]>(getInitialData());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingorder, setEditingorder] = useState<AllOrdersNew | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AllOrdersNew | null>(null);

  const handleViewOrder = (order: AllOrdersNew) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleAddorder = (neworder: AllOrdersNew) => {
    setorders((prevorders) => [...prevorders, neworder]);
  };

  const handleDeleteorder = (id: string) => {
    setorders((prevorders) => prevorders.filter((order) => order.id !== id));
  };

  const handleEditorder = (order: AllOrdersNew) => {
    setEditingorder(order);
    setIsEditModalOpen(true);
  };

  const handleSaveorder = (updatedorder: AllOrdersNew) => {
    setorders((prevorders) =>
      prevorders.map((order) =>
        order.id === updatedorder.id ? updatedorder : order
      )
    );
    setIsEditModalOpen(false);
    setEditingorder(null);
  };

  const actionColumn: ColumnDef<AllOrdersNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteorder(row.original.id)}
        >
          Delete
        </button>

        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleViewOrder(row.original)}
        >
          view
        </button>
        {/* <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEditorder(row.original)}
        >
          Edit
        </button> */}
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllOrdersNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto py-10 text-white">
      <h1 className="text-2xl font-bold mb-4 text-white">All Orders</h1>
      {/* Add Orders Component */}
      <Addorders onAddOrder={handleAddorder} />
      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={orders} />
      {/* Edit order Modal */}

      <EditAllOrdersPopup
        order={editingorder}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveorder}
      />

      {/* Order Details Popup */}

      {selectedOrder && (
        <OrderDetailPopup
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          customerName={
            selectedOrder.order_id === "#254GF45"
              ? "Steve Smith"
              : "Ricky Ponting"
          }
          customerEmail={
            selectedOrder.order_id === "#254GF45"
              ? "Steve@gmail.com"
              : "Ricky@gmail.com"
          }
          date={selectedOrder.date}
        />
      )}
    </div>
  );
}
