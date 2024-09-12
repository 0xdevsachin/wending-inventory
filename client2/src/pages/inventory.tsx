import { ICartItemType } from "@/common/types";
import ProductCard from "@/components/cards";
import Navbar from "@/components/navbar";
import { AxiosClientInstance } from "@/config/axios";
import { useCart } from "@/context/cartContext";
// import { useRouter } from "next/router";
import { useSnackbar } from "notistack";



const Inventory = ({ data }: { data: ICartItemType[] }) => {
    const { addToCart } = useCart();
    const { enqueueSnackbar } = useSnackbar()
    // const router = useRouter()
    return (
        <>
            <Navbar />
            <div className=" grid md:grid-cols-4 gap-10 p-4">
                {data.map((items) => (
                    <ProductCard key={items._id} items={items} handleAddToCart={() => {
                        addToCart({ ...items, quantity: 1 })
                        enqueueSnackbar({ variant: "success", message: `${items.name} added to the cart` })
                    }}
                    // handleBuy={() => {
                    //     addToCart({ ...items, quantity: 1 });
                    //     router.push("/cart")
                    // }}

                    />
                ))}
            </div>
        </>
    );
}

export const getServerSideProps = async () => {
    try {
        const { data } = await AxiosClientInstance().get("/api/inventory");

        return {
            props: {
                data
            }
        }
    } catch (error) {
        return {
            props: {
                data: [],
                error: true
            }
        }
    }
}

export default Inventory;
