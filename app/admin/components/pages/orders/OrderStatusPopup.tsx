// StatusPopup.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOrderContext } from "@/context/OrderContext";

interface StatusPopupProps {
  id: string;
  initialStatus: string;
  onSave: (newStatus: string) => void;
  onClose: () => void;
}

const StatusPopup: React.FC<StatusPopupProps> = ({
  id,
  initialStatus,
  onSave,
  onClose,
}) => {
  const {
    updateOrderStatusById
  } = useOrderContext();
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);

  const handleSave = () => {
    updateOrderStatusById(id, selectedStatus)
    onSave(selectedStatus);
    onClose();
  };

  return (
    <div className="absolute bg-white shadow-md rounded-md p-4 z-50 text-black">
      <h3 className="text-lg font-bold mb-2">Select Status</h3>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="PENDING"
            checked={selectedStatus === "PENDING"}
            onChange={() => setSelectedStatus("PENDING")}
          />
          <span>PENDING</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="COMPLETED"
            checked={selectedStatus === "COMPLETED"}
            onChange={() => setSelectedStatus("COMPLETED")}
          />
          <span>Completed</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="CANCELLED"
            checked={selectedStatus === "CANCELLED"}
            onChange={() => setSelectedStatus("CANCELLED")}
          />
          <span>Cancelled</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="HOLD"
            checked={selectedStatus === "HOLD"}
            onChange={() => setSelectedStatus("HOLD")}
          />
          <span>Hold</span>
        </label>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default StatusPopup;
