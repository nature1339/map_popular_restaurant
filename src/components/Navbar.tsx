import { useState } from "react"; /*모바일에서 열고 닫히도록 상태관리*/
import Link from "next/link";

import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  console.info({ session, status });
  const [isOpen, setIsOpen] = useState(false); /*열려있거나 닫힘*/
  return (
    <>
      <div className="navbar">
        <Link className="navbar_logo" href="/">
          nextmap
        </Link>
        <div className="navbar_list">
          <Link href="/stores" className="navbar_list--item">
            맛집목록
          </Link>
          <Link href="/stores/new" className="navbar_list--item">
            맛집등록
          </Link>
          <Link href="/users/likes" className="navbar_list--item">
            찜한가게
          </Link>
          {status === "authenticated" ? (
            <div
              onClick={async (e) => {
                e.preventDefault();
                await signOut();
                //router 안쓰고 아예 브라우저 초기화하는 이유는 세션날리려고
                location.href = "/";
              }}
              className="navbar_list--item"
            >
              로그아웃
            </div>
          ) : (
            <Link href="/users/login" className="navbar_list--item">
              로그인
            </Link>
          )}
        </div>
        {/*mobile button*/}
        <div
          role="presentation"
          className="navbar_button"
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
          {/*열려있으면, 닫히고 메뉴보이게*/}
        </div>
      </div>

      {/*mobile navbar*/}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar_list--mobile">
            <Link href="/stores" className="navbar_list--item--mobile">
              맛집목록
            </Link>
            <Link href="/stores/new" className="navbar_list--item--mobile">
              맛집등록
            </Link>
            <Link href="/users/likes" className="navbar_list--item--mobile">
              찜한가게
            </Link>
            {status === "authenticated" ? (
              <div
                onClick={async (e) => {
                  e.preventDefault();
                  await signOut();
                  //router 안쓰고 아예 브라우저 초기화하는 이유는 세션날리려고
                  location.href = "/";
                }}
                className="navbar_list--item"
              >
                로그아웃
              </div>
            ) : (
              <Link href="/users/login" className="navbar_list--item">
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
