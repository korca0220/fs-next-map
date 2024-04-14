import Loading from "@/components/Loading";
import { StoreType } from "@/interface";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";

export default function StoreListPage() {
  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery("stores", async () => {
    const { data } = await axios(`/api/stores`);

    return data as StoreType[];
  });

  if (isError)
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        Error...
      </div>
    );

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-200">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.map((store, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : "/images/markers/default.png"
                  }
                  width={48}
                  height={48}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="text-sm font-semibold leading-9 text-gray-900">
                    {store?.name}
                  </div>
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-700">
                    {store?.storeType}
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <div className="text-sm font-semibold leading-9 text-gray-900">
                  {store?.address}
                </div>
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-700">
                  {store?.phone || "번호 없음"} | {store?.feedCertifyName} |{" "}
                  {store?.category === "default" ? "기타" : ""}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
