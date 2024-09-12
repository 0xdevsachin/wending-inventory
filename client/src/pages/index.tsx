import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <div className=" h-[90vh] text-center flex justify-center items-center">
        <div>
          <div className=" text-2xl md:text-[50px] font-bold mx-auto md:leading-[60px]">
            Your Smart Vending Machine <br className=" hidden md:block" /> <span className=" text-brandColor">Supplier</span> & <span className=" text-brandColor">Manufacturer</span>
          </div>
          <div className=" text-xl md:text-[20px] my-4">
            Different types of best quality vending machines <br className=" hidden md:block" /> to meet the needs of all businesses.
          </div>
          <button
            onClick={() => router.push("/inventory")}
            className=" px-6 rounded-md bg-brandColor py-3 mt-4">
            Go to Inventory
          </button>
        </div>
      </div>
    </>
  );
}
