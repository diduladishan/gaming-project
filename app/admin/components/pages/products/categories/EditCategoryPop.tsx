import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoClose } from "react-icons/io5";
import { useCategoryContext } from "@/context/CategoryContext";

interface AddCategoryPopProps {
  onEditCategory: (id: string) => void;
  isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;  
}

const EditCategoryPop: React.FC<AddCategoryPopProps> = ({ onEditCategory, isOpen, setIsOpen }) => {
//   const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const {setEditCategory,editCategory} = useCategoryContext();

  const handleSubmit = () => {
    if (name && description && imageUrl) {
        onEditCategory("1");

      setIsOpen(false);
      setName("");
      setDescription("");
      setImageUrl("");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gradient-to-tr from-black/40 from-15% to-[#00a76a66] border-[#0D6D49] backdrop-blur-sm font-primaryFont text-white text-[13px] p-[3em]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between border-b border-b-[#606060] pb-[1em] text-[1.5em]">
              <h2>Edit Category</h2>
              <button
                className="text-[#00FFA1] hover:opacity-80 transition-opacity duration-100"
                onClick={() => setIsOpen(false)}
              >
                <IoClose />
              </button>
            </DialogTitle>
          </DialogHeader>
          <div className="bg-black/50 border border-[#0D6D49] mt-[1em] px-[2em] py-[3em] rounded-sm">
            <div className="grid grid-cols-2 gap-x-[4.8em] font-medium">
              <div>
                <p className="mb-[0.5em]">Name</p>
                <Input
                  value={editCategory.name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[35ch] text-[1em] px-[1em] py-[0.6em] h-fit border-[#606060]"
                />
              </div>
              <div>
                <p className="mb-[0.5em]">Parent Category</p>
                <Select>
                  <SelectTrigger className="border-[#606060]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-sm *:p-[1em]">
                    <SelectItem value="Parent 1">Parent 1</SelectItem>
                    <SelectItem value="Sub Category 1.1">
                      Sub Category 1.1
                    </SelectItem>
                    <SelectItem value="Sub Category 1.1.1">
                      Sub Category 1.1.1
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* <div className="mt-[1.4em]">
              <p className="mb-[0.5em]">Image</p>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setImageUrl(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-[1em] p-0 border-[#606060] h-fit file:bg-[#313131] file:text-[#D9D9D9] file:px-[1em] file:py-[0.6em] file:me-[1em] file:cursor-pointer hover:file:text-white"
              />
            </div> */}

            <div className="mt-[1.4em]">
              <p className="mb-[0.5em]">Description</p>
              <textarea
                value={editCategory.description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-transparent border border-[#606060] rounded-sm text-[1em] px-[1em] py-[0.6em]"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mt-[3.1em]">
            <p className="text-[10px] max-w-[65ch]">
              Please review and ensure that all the details you have entered are
              correct before submitting.
            </p>
            <button
              className="text-black font-semibold text-[14px] px-[1.5em] py-[0.5em] bg-[#00FFA1] rounded hover:opacity-90 transition-opacity duration-100"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCategoryPop;
