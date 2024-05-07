/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  Checkbox,
  FormControlLabel,
  SvgIcon,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CloseIcon from "@mui/icons-material/Close";
import { useUserLoginApi } from "../components/api/useLoginApi";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const jwtSign = require("jwt-encode");
const { default: jwtDecode } = require("jwt-decode");

const CustomCheckbox = () => (
  <SvgIcon viewBox="0 0 28 28">
    <path
      d="M13.5943 2.26562C7.34086 2.26562 2.26562 7.34086 2.26562 13.5943C2.26562 19.8477 7.34086 24.9229 13.5943 24.9229C19.8477 24.9229 24.9229 19.8477 24.9229 13.5943C24.9229 7.34086 19.8477 2.26562 13.5943 2.26562ZM10.5242 18.4543L6.45722 14.3873C6.0154 13.9455 6.0154 13.2317 6.45722 12.7899C6.89904 12.3481 7.61274 12.3481 8.05456 12.7899L11.3285 16.0526L19.1226 8.25848C19.5645 7.81666 20.2782 7.81666 20.72 8.25848C21.1618 8.70029 21.1618 9.414 20.72 9.85581L12.1215 18.4543C11.6911 18.8961 10.966 18.8961 10.5242 18.4543Z"
      fill="black"
    />
  </SvgIcon>
);

const signin = ({
  onClose,
  openSignup,
  setLoginButtonEvent,
  openFindID,
  openFindPW,
  toast,
}) => {
  const { mutateAsync: userLoginApi, isLoading: isLogin } = useUserLoginApi();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const loginFun = async (e) => {
    let loginData = {
      email: email,
      password: password,
    };

    try {
      e.stopPropagation();

      const result = await signIn("credentials", {
        username: loginData.email,
        password: loginData.password,
        redirect: false,
      });

      if (!result.ok) {
        toast.error("아이디 또는 비밀번호를 확인해주세요.");
        return;
      }
      console.info("result", result);

      // let { data } = await userLoginApi(loginData);
      // console.log(data);
      // const userToken = jwtSign(
      //   {
      //     email: data.email,
      //     company_name: data.company_name,
      //     full_name: data.full_name,
      //     token: "mon_access_token_20",
      //   },
      //   "test_provider_secret"
      // );

      // const user = jwtDecode(userToken);

      // sessionStorage.setItem("isLogin", true);
      // sessionStorage.setItem("email", data.email);
      // sessionStorage.setItem("type", data.user_type);
      // sessionStorage.setItem("full_name", data.full_name);
      // sessionStorage.setItem("accessToken", userToken);

      setLoginButtonEvent(false);
      onClose();

      //  router.reload();
    } catch (res) {
      let { data } = res.response;

      toast.error(data.error ?? data.message);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{ style: { width: "600px" } }}
    >
      <DialogContent style={{ height: "400px" }}>
        <Button
          onClick={onClose}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <CloseIcon />
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="/images/header-logo.png" alt="Logo" />
          <div className="mt-5 flex items-center justify-center w-full">
            <label className="text-[13px] font-bold w-[100px]">
              이메일 주소 *
            </label>
            <TextField
              variant="outlined"
              size="small"
              id="email"
              name="email"
              style={{
                width: "325px",
                height: "44px",
                borderRadius: "4px",
                background: "#FFF",
                marginLeft: "10px",
              }}
              onChange={onChange}
            />
          </div>
          <div className="mt-5 flex items-center justify-center w-full">
            <label className="text-[13px] font-bold w-[100px]">
              비밀번호 *
            </label>
            <TextField
              type="password"
              variant="outlined"
              size="small"
              id="password"
              name="password"
              style={{
                width: "325px",
                height: "44px",
                borderRadius: "4px",
                background: "#FFF",
                marginLeft: "10px",
              }}
              onChange={onChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loginFun(e);
                }
              }}
            />
          </div>
          <FormControlLabel
            control={
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CustomCheckbox />}
                style={{ width: "28px", height: "28px" }}
              />
            }
            label={
              <span style={{ fontSize: "13px", marginLeft: "5px" }}>
                로그인 유지
              </span>
            }
            style={{
              alignSelf: "flex-start",
              marginTop: "20px",
              marginLeft: "165px",
              marginBottom: "10px",
            }}
          />
          <div
            style={{ marginTop: "10px", color: "#747983", fontSize: "13px" }}
          >
            <span onClick={openSignup} className="cursor-pointer">
              회원가입
            </span>
            <span style={{ marginLeft: "10px", marginRight: "10px" }}>|</span>
            <span onClick={openFindPW} className="cursor-pointer">
              비밀번호 찾기
            </span>
          </div>
          <Button
            variant="contained"
            style={{
              marginTop: "20px",
              width: "232px",
              height: "40px",
              borderRadius: "4px",
              background: "linear-gradient(270deg, #58B9FF 0%, #518EFF 100%)",
            }}
            onClick={loginFun}
          >
            로그인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default signin;
