/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreType } from "@/interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface MarkerProps {
  map: any;
  stores: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  stores: storeDataList,
  setCurrentStore,
}: MarkerProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      storeDataList?.map((store) => {
        const imageSrc = store?.category
            ? `/images/markers/${store?.category}.png`
            : "/images/markers/default.png",
          imageSize = new window.kakao.maps.Size(32, 32),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const markerPosition = new window.kakao.maps.LatLng(
          store?.lat,
          store?.lng
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);

        const content = `<div class="infowindow">${store?.name}</div>`;

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          customOverlay.setMap(null);
        });

        // 선택한 가게 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
        });
      });
    }
  }, [map, setCurrentStore, storeDataList]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return <></>;
}
