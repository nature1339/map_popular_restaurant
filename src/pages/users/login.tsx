import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Nextjs용 router

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });
      if (!result || !result.ok) {
        alert("아이디 또는 비밀번호를 확인해주세요.");
        // toast.error("아이디 또는 비밀번호를 확인해주세요.");
        return;
      }
      alert("로그인 성공");
      router.push("/");
      // const auth = getAuth(app);
      // await signInWithEmailAndPassword(auth, email, password);
      // toast.success("로그인에 성공했습니다.");
      // props.setIsAuthenticated(true);
      // navigate("/");
    } catch (error: any) {
      // toast.error(error?.code);
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    }

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
