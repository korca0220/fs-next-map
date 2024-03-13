import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface StoreBoxProps {
  store: any;
  setStore: Dispatch<SetStateAction<any>>;
}
export default function StoreBox({ store, setStore }: StoreBoxProps) {
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div>
            <Image
              src={
                store?.bizcnd_code_nm
                  ? `/images/markers/${store?.bizcnd_code_nm}.png`
                  : "/images/markers/default.png"
              }
              width={100}
              height={100}
              alt="아이콘 이미지"
            />
          </div>
        </>
      )}
    </div>
  );
}
