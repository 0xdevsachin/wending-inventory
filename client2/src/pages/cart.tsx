import Navbar from "@/components/navbar";
import { AxiosClientInstance } from "@/config/axios";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";

export default function Cart() {
    const router = useRouter()
    const { cartItems, removeFromCart, addToCart } = useCart();
    const { enqueueSnackbar } = useSnackbar();
    const [timer, setTime] = useState(5);
    const [timerStarted, setTimeStarted] = useState(false)

    const updateItems = async () => {
        try {
            enqueueSnackbar({ variant: "info", message: "Payment Initiated" })
            const itemsToUpdate = cartItems.map((items) => {
                return { id: items._id, quantity: items.quantity }
            })
            const promise = itemsToUpdate.map((item) => AxiosClientInstance().put("/api/inventoryUpdate", {
                ...item
            }))
            await Promise.all(promise)
            const timeId = setInterval(() => {
                setTimeStarted(true);
                if (timer === 0) return;
                setTime((prev) => prev - 1);
            }, 1000);
            setTimeout(() => {
                clearInterval(timeId);
                removeFromCart("", true)
                router.push("/inventory");
            }, 5000);

        } catch (error) {
            enqueueSnackbar({ variant: "error", message: "Something went wrong!!" })
        }

    }

    return (
        <>
            <Navbar />
            <div className=" max-h-[90vh] text-center flex">
                {!timerStarted ? <>
                    {cartItems.length === 0 ?
                        (<div className=" flex h-[90vh] flex-col w-full justify-center items-center gap-4">
                            <div className=" text-2xl font-bold">Please add items from the inventory</div>
                            <button
                                onClick={() => router.push("/inventory")}
                                className=" px-6 rounded-md font-bold bg-brandColor py-3 mt-4">
                                Go to Inventory
                            </button>
                        </div>)
                        :
                        (<div className=" w-full"><div className=" grid md:grid-cols-4 gap-10 w-full p-4">
                            {cartItems.map((items) => <>
                                <div key={items.name} className=" rounded-md h-fit bg-[#1b1b1b] p-3">
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
                                        <div>Units: {items.quantity}</div>
                                        <div>Price: {items.price * items.quantity}$</div>
                                    </div>
                                    <div className=" flex justify-between items-center gap-4">
                                        <button
                                            onClick={() => {
                                                removeFromCart(items._id);
                                                enqueueSnackbar({ variant: "success", message: `${items.quantity > 1 ? `${items.name} quantity reduced in the cart` : `${items.name} removed from the cart`}` })
                                            }}
                                            className=" border-brandColor border-2 disabled:opacity-80 text-brandColor w-full font-bold p-2 mb-2 rounded-md"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            onClick={() => {
                                                addToCart(items)
                                                enqueueSnackbar({ variant: "success", message: `${items.name} quantity increased in the cart` })
                                            }}
                                            className=" bg-brandColor w-full font-bold p-2 mb-2 disabled:opacity-80 rounded-md"
                                        >
                                            Add More
                                        </button>
                                    </div>
                                </div>
                            </>)}

                        </div>
                            <div className=" w-fit mx-auto my-4">
                                <button
                                    onClick={updateItems}
                                    className=" bg-brandColor w-[300px] font-bold p-3 mb-2 disabled:opacity-80 rounded-md"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        )
                    }
                </>
                    :
                    <div className=" flex h-[90vh] flex-col w-full justify-center items-center gap-4">
                        <div className=" text-3xl font-bold text-brandColor">Payment Successful!</div>
                        <div className=" text-xl font-semibold">Redirecting you back to inventory in <span className=" font-bold text-brandColor">{timer}</span> seconds...</div>
                    </div>
                }
            </div>
        </>
    );
}
