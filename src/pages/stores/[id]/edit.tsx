import { useRouter } from "next/router";

export default function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>STORE EDIT PAGE : {id}</h1>
    </div>
  );
}
