import Image from 'next/image'

export default function StoreListPage({stores}:{stores: any}) {
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8"> 
      <ul role="list" className="divide-y divide-gray-100">
       {stores?.map((store, index) => 
        <li className = "flex justify-between gap-x-6 py-5" key={index}>
          <div className="flex gap-x-4">
            <Image
              src={
                store?.bizcond_code_nm
                ? `/images/markers/${store?.bizcnd_code_nm}.png`
                : "/images/markers/default.png"
              }
              width={48}
              height={48}
              alt = "아이콘 이미지"
              />
              <div className="text-sm font-semibold leading-6 text-grey-900">
                {store?.upso_nm}
              </div>
              <div className="mt-1 text-xs truncate font-semibold leading-5 text-grey-500">
                {store?.upso_nm}
              </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <div className="text-sm font-semibold leading-6 text-grey-900">
              <div>           
                {store?.rdn_upso_nm} {/*도로명주소*/} 
              </div>
              <div className="mt-1 text-xs truncate font-semibold leading-5 text-grey-500">
                {store?.tel_nm || "번호없음"} | {store?.crtfc_gbn_nm}| {""}
                {store?.bizcnd_code_nm}
              </div>
            </div>
          </div>
        </div>
        </li>
      }
      </ul>
      <h1>Store List</h1>
    </div>
  );
}

export async function getServerSideProps() {
  const stores = await fetch(`$(process.env.NEXT_PUBLIC_API_URL}/api/stores`
).then((res)=> res.json()); //응답을 json형식으로 변경

return{
  props: {stores},
}

}
