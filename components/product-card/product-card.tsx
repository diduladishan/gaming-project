import React, { useState } from "react";

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";

import StarRating from "@/app/(home)/_components/star-rating";

interface ProductCardProps {
  id: string;
  poster: string;
  name: string;
  desc: string;
  rating: number;
  discountPrice: number;
  originalPrice: number;
  wishList: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  poster,
  name,
  desc,
  rating,
  discountPrice,
  originalPrice,
  wishList,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <article className="w-fit bg-white/5 text-[7px] p-[0.6em] border border-white/20 select-none sm:text-[9px] md:text-[11px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
      <div
        className="relative w-[86px] h-[96px] bg-cover bg-center mb-[0.5em] sm:w-[120px] md:w-[150px] lg:w-[180px] xl:w-[210px] 2xl:w-[246px] sm:h-[130px] md:h-[160px] lg:h-[200px] xl:h-[240px] 2xl:h-[270px]"
        style={{ backgroundImage: `url(${poster})` }}
      >
        {wishList ? (
          <IoHeartSharp
            className="absolute top-[0.2em] left-[0.2em] text-[1.5em] cursor-pointer hover:scale-105"
            onClick={() => setIsWishlisted(false)}
          />
        ) : (
          <IoHeartOutline
            className="absolute top-[0.2em] left-[0.2em] text-[1.5em] cursor-pointer hover:scale-105"
            onClick={() => setIsWishlisted(true)}
          />
        )}
      </div>

      <h5 className="w-[12ch] font-bold text-[9px] uppercase overflow-hidden text-nowrap text-ellipsis sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[22px] 2xl:text-[25px]">
        {name}
      </h5>
      <p className="w-[14ch] font-medium uppercase overflow-hidden text-nowrap text-ellipsis">
        {desc}
      </p>
      <hr className="border-t-white/20 my-[0.5em]" />

      <div className="flex items-center justify-between">
        <div
          className={`${
            rating > 0 ? "text-[#f29d38]" : "text-white/20"
          } text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]`}
        >
          {rating > 0 ? (
            <StarRating rating={Math.round(rating)} />
          ) : (
            <StarRating rating={5} />
          )}
        </div>

        <button className="text-[9px] hover:opacity-70 sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[22px] 2xl:text-[25px]">
          <MdOutlineShoppingCart />
        </button>
      </div>

      <div className="flex items-baseline gap-x-[0.5em]">
        <p className="font-rajdhaniFont font-semibold text-[17px] text-[#75F94C] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[42px] 2xl:text-[46px]">
          ${discountPrice === 0 ? originalPrice : discountPrice}
        </p>
        {discountPrice !== 0 && (
          <p className="line-through">${originalPrice}</p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
