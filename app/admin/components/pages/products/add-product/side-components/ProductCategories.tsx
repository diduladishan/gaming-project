import { useEffect, useState } from "react";

import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner/Spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "../../../../admin.css";
import { useSidebar } from "@/context/SidebarContext";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  level: number;
  parentId: string | null;
  children?: Category[];
};

interface ProductCategoriesProps {
  categories: string[];
  setCategories: (categories: string[]) => void;
  selectedCategories?: string[];
  readOnly?: boolean; // Add this line
}

const ProductCategories = ({
  categories,
  setCategories,
  selectedCategories,
  readOnly = false, // Default to false
}: ProductCategoriesProps) => {
  console.log("cat", categories);
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setSelectedItem } = useSidebar();

  useEffect(() => {
    getAllCategoriesByObject();
  }, []);

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getAllCategoriesByObject = async () => {
    setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.get("/categories/object");
      setData(response.data); // Assuming the API returns the category structure
    } catch (error: any) {
      showToast(
        false,
        error.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const handleCheckboxChange = (categoryId: string) => {
    if (readOnly) return; // Prevent interaction in read-only mode
    if (categories.includes(categoryId)) {
      setCategories(categories.filter((id) => id !== categoryId));
    } else {
      setCategories([...categories, categoryId]);
    }
  };

  const renderCategories = (categoryList: Category[]) => {
    return (
      <ul>
        {categoryList.map((category) => (
          <li
            key={category.id}
            className={category.level > 1 ? "ms-[1em]" : undefined}
          >
            <div className="w-fit flex items-center gap-x-[0.3em] mb-5 hover:opacity-85 lg:text-[12px] xl:mb-[1em]">
              <Checkbox
                id={category.id}
                className="bg-transparent border-[#606060] rounded-[2px] data-[state=checked]:bg-inherit data-[state=checked]:text-[#00FFA1]"
                checked={categories.includes(category.id)}
                onCheckedChange={() => handleCheckboxChange(category.id)}
                disabled={readOnly} // Disable interaction in read-only mode
              />
              <label
                htmlFor={category.id}
                className="cursor-pointer capitalize select-none"
              >
                {category.name}
              </label>
            </div>
            {category.children &&
              category.children.length > 0 &&
              renderCategories(category.children)}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="bg-black/40 mb-[2.8em] px-[2em] py-[1em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
      <div
        className="flex justify-between items-center cursor-pointer text-[1.2em] mb-[0.1em] hover:opacity-85"
        onClick={toggleDropdown}
      >
        <p className="select-none">Product Categories</p>
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
        <p className="text-[1.1em] mb-[0.5em]">All Categories</p>

        <ScrollArea className="h-[20em] px-2 py-2 border border-[#606060] rounded-sm mb-[0.9em] lg:h-[10em]">
          {renderCategories(data)}
        </ScrollArea>
      </div>
      <div
        className="text-[#0BDB45] hover:opacity-85"
        onClick={() => setSelectedItem("categories")}
      >
        Add new category
      </div>
    </div>
  );
};

export default ProductCategories;
