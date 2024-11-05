import { useEffect, useState } from "react";

import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useSidebar } from "@/context/SidebarContext";

interface Brands {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface BrandCategoriesProps {
  brand: string;
  setBrand: (brand: string) => void;
  disabled?: boolean; // Add this line
}

const BrandCategories = ({
  brand,
  setBrand,
  disabled,
}: BrandCategoriesProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [brands, setBrands] = useState<Brands[]>([]);
  const { setSelectedItem } = useSidebar();

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  const getAllBrands = async () => {
    setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.get("/brands");
      setBrands(response.data);
      // showToast(true, "Categories fetched successfully"); // You can enable this toast if needed
    } catch (error: any) {
      showToast(
        false,
        error.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBrandSelect = (selectedBrand: string) => {
    if (!disabled) {
      setBrand(selectedBrand);
    }
  };

  return (
    <div className="bg-black/40 mb-[2.8em] px-[2em] py-[1em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
      <div
        className="flex justify-between items-center cursor-pointer text-[1.2em] mb-[0.1em] hover:opacity-85"
        onClick={toggleDropdown}
      >
        <p className="select-none">Brand Categories</p>
        <button type="button">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>
      <hr className="border-t-[#606060] mb-[0.6em]" />

      <div
        className={`${
          isOpen ? "h-[23em] lg:h-[13em]" : "h-0"
        } overflow-clip transition-all duration-500`}
      >
        <p className="text-[1.1em] mb-[0.5em]">All Brands</p>

        <ScrollArea className="h-[20em] px-2 py-2 border border-[#606060] rounded-sm mb-[0.9em] lg:h-[10em]">
          <RadioGroup
            onValueChange={(value: string) => handleBrandSelect(value)}
            value={brand}
          >
            {brands.map((brandItem) => (
              <div
                key={brandItem.id}
                className="w-fit flex items-center gap-x-[0.3em] mb-5 hover:opacity-85 lg:text-[12px] xl:mb-[1em]"
              >
                <RadioGroupItem
                  value={brandItem.id}
                  id={brandItem.id}
                  disabled={disabled}
                />
                <label
                  htmlFor={brandItem.id}
                  className={`cursor-pointer select-none ${
                    disabled ? "opacity-50" : ""
                  }`}
                >
                  {brandItem.name}
                </label>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
      </div>

      <div
        className="text-[#0BDB45] hover:opacity-85"
        onClick={() => setSelectedItem("brands")}
      >
        Add new brand
      </div>
    </div>
  );
};

export default BrandCategories;
