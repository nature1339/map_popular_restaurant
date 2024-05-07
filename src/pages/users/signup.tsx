import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }).then(async (res) => {
        const resData = await res.json();
        if (resData.success) {
          alert("회원가입 성공");
        } else {
          alert("회원가입 실패");
        }
      });
      // const auth = getAuth(app);
      // await createUserWithEmailAndPassword(auth, email, password);
      // toast.success("회원가입에 성공했습니다.");
      // navigate("/");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      //toast.error(error?.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError("비밀번호와 비밀번호 확인값이 다릅니다. 다시 확인해 주세요");
      } else {
        setError("");
      }
    }

    if (name === "password_confirm") {
      setPasswordConfirm(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (value !== password) {
        setError("비밀번호와 비밀번호 확인값이 다릅니다. 다시 확인해 주세요");
      } else {
        setError("");
      }
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="form form--lg"
      //임의 추가
      style={{
        marginTop: 200,
      }}
    >
      <h1 className="form_title">회원가입</h1>
      <div className="form_block">
        <label htmlFor="title">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
        />
      </div>
      <div className="form_block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={onChange}
        />
      </div>
      <div className="form_block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          onChange={onChange}
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form_block">
          <div className="form_error">{error}</div>
        </div>
      )}
      <div className="form_block">
        계정이 이미 있으신가요?
        <Link href="/users/login" className="form_link">
          로그인하기
        </Link>
      </div>
      <div className="form_block">
        <input
          type="submit"
          value="회원가입"
          className="form_btn--submit"
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
}
