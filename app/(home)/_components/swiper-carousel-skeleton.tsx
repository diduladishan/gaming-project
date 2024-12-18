import React from "react";

import { Button } from "@/components/ui/button";
import { IoHeartOutline } from "react-icons/io5";

import Rating from "@/components/rating/rating";

const SwiperCarouselSkeleton = () => {
  return (
    <article
      className="w-full h-fit bg-white/20 backdrop-blur-[10px] p-[5em] pt-0 mt-[8em] mb-[3em] md:p-[2em] md:mt-[4em] md:mb-[0.5em] md:grid md:grid-cols-2 md:place-items-end md:gap-x-[2em] animate-pulse"
      // style={{
      //   backgroundImage: `linear-gradient(to top right, #002304 0%, #FFFFFF14 40%, #FFFFFF14 60%, #002304 100%)`,
      //   borderImage: `linear-gradient(to bottom, #9DA8A0 0%, #00FF47 100%) 1`,
      //   borderWidth: "1px",
      //   borderStyle: "solid",
      // }}
    >
      {/* Poster */}
      <div className="relative w-[92%] h-[300px] mx-auto -translate-y-[7em] md:w-full md:h-full md:-translate-y-0">
        <div className="absolute left-0 bottom-0 w-full h-[318px] bg-white/40 flex items-center justify-center text-center md:h-[328px] md:items-start lg:h-[340px] xl:h-[427px] 2xl:h-[513px]"></div>
      </div>

      <div className="-mt-[5em] md:-mt-0">
        {/* Title */}
        <h3 className="font-bold text-[2em] line-clamp-1 uppercase text-transparent bg-white w-1/2 leading-none mt-[0.1em] mb-[0.2em] opacity-50">
          Vingame
        </h3>

        {/* Rating */}
        <div className="text-[1.25em] pb-[0.7em]">
          <Rating rating={0} />
        </div>
        <hr className="w-2/5" />

        {/* Description */}
        <div className="h-[15em] pt-[1.5em] text-justify font-normal text-transparent opacity-50">
          <p className="line-clamp-1 bg-white mb-[0.4em]">
            Your one-stop destination.
          </p>
          <p className="line-clamp-1 bg-white">Your one-stop destination.</p>
        </div>

        {/* Price and release date */}
        <div className="flex items-end justify-between pt-[1.5em] text-transparent opacity-0">
          <h4 className="leading-none">
            <span className="text-[1.8em]">$00.00</span>
            <span className="text-[1.1em]"> USD</span>
          </h4>
          <div>
            <p className="flex cursor-pointer hover:scale-105 transition-transform duration-150 w-fit">
              <IoHeartOutline className="text-[1.4em] me-[0.2em]" />
              999K
            </p>
            <p className="leading-none mt-[0.3em] mb-[0.1em]">
              Release Date: Dec 31 2000
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-[2em] gap-x-[1em]">
          <Button
            className="text-[1.1em] font-semibold capitalize px-[3em] py-[1em] rounded-none h-fit bg-white"
            disabled
          >
            <p className="opacity-0">Buy now</p>
          </Button>
          <Button
            variant="outline"
            className="text-[1.1em] font-semibold capitalize px-[3em] py-[1em] rounded-none h-fit bg-white border-none"
            disabled
          >
            <p className="opacity-0">Add to cart</p>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default SwiperCarouselSkeleton;
