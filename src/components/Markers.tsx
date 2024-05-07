import { useState, useCallback, Dispatch, SetStateAction } from "react";

interface MarkerProps {
  map: any;
  stores: any[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({map, stores, setCurrentStore}: MarkerProps) {
  const loadKakoMarkers = useCallback() => {
    if (map) {
      // 식당 데이터 마커 띄우기
      stores?.map((store) => {
        //식당 data를 maping을 하면서
        var imageSrc = store?.bizcnd_code_nm //store의 카테고리를 통해서
            ? `/images/markers/${store?.bizcnd_code_nm}.png` //마커 이미지를 정의를 해주고
            : "/images/markers/default.png",
          imageSize = new window.kakao.maps.Size(40, 40), //마커 속성들을 정의해줌
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; //마커 속성들을 정의해줌

        var markerImage = new window.kakao.maps.MarkerImage( //kakao apps의 image함수통해서
          imageSrc, //해당 marker image를 생성하고
          imageSize,
          imageOption
        );

        //마커가 표시될 위치입니다.
        var markerPosition = new window.kakao.maps.Lating(
          store?.y_dnts, //marker 위도,
          store?.x_cnts //       경도값으로 정의
        );

        //마커를 생성합니다.
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, //마커이미지 설정
        }); //default가 아니고, 지정한 이미지로 생성

        //마커가 지도위에 표시되도록 설정합니다.
        marker.setMap(map);

        //마커 커서가 오버되었을때 마커 위에 표시할 인포윈도우 생성
        var content = `<div class="infowindow">${store?.upso_nm}</div>`; //인포윈도우에 표시될 내용

        //커스텀 오버레이를 생성
        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시합니다
          customOverlay.setMap(map); //mouseover했을때 map위에 표시되게
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
          customOverlay.setMap(null); //mouseover끝났을때 map위에 표시되지 않도록
        });
        //선택한 가게 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
        });
      });
    }
  }, [map, setCurrentStore, storeDatas]);

  useEffect(() => {
    loadKakoMarkers();
  }, [loadKakoMarkers, map]);
  return <></>;
}
