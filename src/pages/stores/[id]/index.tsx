import { StoreType } from "@/interface";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function StoreDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);

    return data as StoreType;
  };

  const {
    data: store,
    isFetching,
    isError,
  } = useQuery(`store-${id}`, fetchStore, {
    enabled: !!id,
  });

  return (
    <div>
      <h1>STORE DETAIL PAGE : {id}</h1>
    </div>
  );
}
