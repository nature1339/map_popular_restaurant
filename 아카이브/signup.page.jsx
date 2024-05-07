import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NormalMemberSignup from "../components/sign/normalMemberSignup";
import PartnerMemberSignup from "../components/sign/partnerMemberSignup";

const Signup = ({ onClose, toast }) => {
  const [memberType, setMemberType] = useState(null);

  // 회원 유형을 변경하고 새로운 대화상자를 열기 위한 함수
  const openSignupDialog = (type) => {
    setMemberType(type);
  };

  // 새로운 대화상자(Dialog)가 열렸을 때 닫기 함수
  const closeSignupDialog = () => {
    setMemberType(null); // 다시 null로 설정하여 대화상자를 닫습니다.
  };

  return (
    <>
      {memberType === null && (
        <Dialog
          open={true}
          onClose={onClose}
          maxWidth={false}
          PaperProps={{
            style: {
              width: "915px",
              height: "427px",
              boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.09)",
            },
          }}
        >
          <DialogContent>
            <Button
              onClick={onClose}
              style={{ position: "absolute", right: 0, top: 0 }}
            >
              <CloseIcon />
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  onClick={() => {
                    openSignupDialog("normal"); // 일반 회원 선택
                  }}
                  style={{
                    width: "254px",
                    height: "110px",
                    borderRadius: "4px",
                    background:
                      "linear-gradient(270deg, #58B9FF 0%, #518EFF 100%)",
                    color: "#FFF",
                    fontSize: "13px",
                    fontWeight: "700",
                    display: "inline-block",
                    lineHeight: "110px",
                    cursor: "pointer",
                  }}
                >
                  일반 회원
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    width: "203px",
                    height: "51px",
                    fontSize: "13px",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                  className="ml-[120px]"
                >
                  소프트웨어, 하드웨어 구매가 필요한 기업 담당자
                </div>
              </div>
              <div
                style={{ width: "1px", height: "100%", background: "#ADB2BB" }}
              ></div>
              <div style={{ width: "50%", textAlign: "center" }}>
                <div
                  onClick={() => {
                    openSignupDialog("partner"); // 일반 회원 선택
                  }}
                  style={{
                    width: "254px",
                    height: "110px",
                    borderRadius: "4px",
                    background:
                      "linear-gradient(270deg, #58B9FF 0%, #518EFF 100%)",
                    color: "#FFF",
                    fontSize: "13px",
                    fontWeight: "700",
                    display: "inline-block",
                    lineHeight: "110px",
                    cursor: "pointer",
                  }}
                >
                  파트너 회원
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    width: "203px",
                    height: "51px",
                    fontSize: "13px",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                  className="ml-[120px]"
                >
                  소프트웨어, 하드웨어를 제공하는 기업의 담당자라면 누구나
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {memberType === "normal" ? (
        <NormalMemberSignup onClose={onClose} toast={toast} />
      ) : memberType === "partner" ? (
        <PartnerMemberSignup onClose={onClose} toast={toast} />
      ) : null}
    </>
  );
};

export default Signup;
