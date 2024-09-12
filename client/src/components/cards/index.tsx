import { ICartItemType } from "@/common/types";
import Image from "next/image";

const ProductCard = ({
    items,
    handleAddToCart,
    // handleBuy,
}: {
    items: ICartItemType;
    handleAddToCart: () => void;
    // handleBuy: () => void;
}) => {
    return (
        <>
            <div key={items.name} className=" rounded-md h-fit max-h-[380px] bg-[#1b1b1b] p-3">
                <div className=" text-2xl font-bold my-2">{items.name}</div>
                <div className=" relative h-[200px] w-full">
                    <Image
                        src={items.display_image_url}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className=" flex font-bold justify-between my-4 items-center">
                    <div>Units: {items.available_units}</div>
                    <div>Price: {items.price}$</div>
                </div>
                <div className=" flex justify-between items-center gap-4">
                    <button
                        onClick={handleAddToCart}
                        disabled={items.available_units === 0 || items.price === 0}
                        className=" bg-brandColor w-[60%] hover:bg-transparent hover:border-brandColor mb-3 hover:border mx-auto font-bold p-2 mb-2 disabled:opacity-80 rounded-md"
                    >
                        Add to cart
                    </button>
                    {/* <button
                        onClick={handleBuy}
                        disabled={items.available_units === 0 || items.price === 0}
                        className=" bg-brandColor w-full font-bold p-2 mb-2 disabled:opacity-80 rounded-md"
                    >
                        Buy
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default ProductCard;
