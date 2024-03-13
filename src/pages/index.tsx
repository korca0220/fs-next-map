import Map from "@/components/Map";
import Markers from "@/components/Markers";

import * as stores from "@/data/store_data.json";
import { useState } from "react";

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDataList = stores?.["DATA"];

  return (
    <>
      <Map setMap={setMap} />
      <Markers
        storeDataList={storeDataList}
        map={map}
        setCurrentStore={setCurrentStore}
      />
    </>
  );
}
