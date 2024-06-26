/* eslint-disable no-constant-condition */

import { StoreType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface Like {
  storeId: number;
}

export default function Like({ storeId }: { storeId?: number }) {
  const { data: session } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);

    return data as StoreType;
  };

  const { data: store, refetch } = useQuery(
    `like-store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId,
      refetchOnWindowFocus: false,
    }
  );
  const toggleLike = async () => {
    if (session?.user && store) {
      try {
        const like = await axios.post("/api/likes", {
          storeId: store.id,
        });

        if (like.status === 200) {
          toast.success("가게를 찜했습니다.");
        } else {
          toast.warn("찜을 취소했습니다.");
        }
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {store?.likes?.length ? (
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart />
      )}
    </button>
  );
}
