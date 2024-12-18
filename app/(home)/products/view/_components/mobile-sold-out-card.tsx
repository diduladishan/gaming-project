import React from "react";

import { RiEmotionSadLine } from "react-icons/ri";
import WishlistButton from "@/components/product-card/WishlistButton";

const MobileSoldOutCard: React.FC<{ id: string; title: string }> = ({
  id,
  title,
}) => {
  return (
    <div
      className=" bg-white/5 px-[1.6em] py-[1.6em] mt-[0.6em] mb-[1.6em] backdrop-blur-[2px] text-[15px] text-center sm:hidden"
      style={{
        borderImage: "linear-gradient(to bottom, transparent, #999999) 1",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      {/* Game title */}
      <h3 className="uppercase font-bold text-[1.2em]">{title}</h3>

      <hr className="max-w-[360px] mx-auto" />

      <div className="flex flex-col items-center justify-center text-center">
        <RiEmotionSadLine className="text-[3em] text-[#75F94C] mt-[0.15em]" />

        <h4 className="font-bold text-[0.83em] text-[#75F94C] my-[0.4em] uppercase">
          Sorry, sold out &#58;&#40;
        </h4>

        <p className="text-[0.75em] mb-[1em]">
          Want this game? Add it to your wishlist <br /> to keep track of it
          while it&apos;s sold out.
        </p>

        <WishlistButton gameId={id} showText />
      </div>
    </div>
  );
};

export default MobileSoldOutCard;
