import { useState } from "react";

import Map from "@/components/Map";
import Markers from "@/components/Markers";

import * as stores from "@/data/store_data.json";
import StoreBox from "@/StoreBox";

export default function Home({stores: StoreType[]}) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  
  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map}setCurrentStore={setCurrentStore} />
      //markers라는 component에 stores data전달가능
      <StoreBox store={currentStore} setStore={setCurrentStore} />
      // 현재선택한 store를 storebox에서 보여줄수있음 // setCurrentStore했을때
      null값으로 변경가능
    </>
  );
}

export async function getStaticProps() {
  const stores =await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}`)) / api / stores`
  ).then((res)=> res.json()); //response를 json으로 변경한후에 위
  import * as stores from "@/data/store_data.json";에 전달

  return {
    props: {stores},
    revalidate: 60*60,
  };
}

/*
    if (!value?.match(validRegex)) {
      setError("이메일 형식이 올바르지 않습니다.");
    } else {
      setError("");
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요.");
      } else {
        setError("");
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form form--lg">
        <h1 className="form_title">로그인</h1>
        <div className="form_block">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="form_block">
          <label htmlFor="summary">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={onChange}
            value={password}
          />
        </div>
        {error && error?.length > 0 && (
          <div className="form_block">
            <div className="form_error">{error}</div>
          </div>
        )}
        <div className="form_block">
          계정이 없으신가요?
          <Link href="/users/signup" className="form_link">
            회원가입하기
          </Link>
        </div>
        <div className="form_block">
          <input
            type="submit"
            value="로그인"
            className="form_btn--submit"
            disabled={error?.length > 0}
          />
        </div>
      </form>
    </div>
  );
}
*/