import { BlueBtn } from "@/src/styles/common";
import { errorHandler } from "@/src/utils/functions/errorHandler";
import { convertDate } from "@/src/utils/functions/global";
import { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";
import Popup, { ContainerPopup, HeadPopup } from ".";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { T_Response } from "@/src/utils/types/global";
import { Icon } from "@/src/styles/common/icon";
import { axiosInstance } from "@/src/utils/helper/axios";
import { SpinnerLoading } from "../common/SpinnerLoading";

interface TemplatePopupProps {
  onClose: () => void;
  setFlag: () => void;
}

type Template = {
  id: string;
  title: string;
  created_at: string;
};

const TemplatePopup: FC<TemplatePopupProps> = memo(({ onClose, setFlag }) => {
  const [active, setActive] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [templates, setTemplates] = useState<T_Response<Template> | null>(null);

  useEffect(() => {
    axiosInstance()
      .get("question/template/")
      .then((res) => {
        setTemplates(res.data);
      })
      .catch((err) => {
        setError("مشکلی پیش آمده لطفا با پشتیبانی تماس بگیرید");
        errorHandler(err.response);
      });
  }, []);

  const handleClick: (id: string) => void = (id) => {
    if (id === active) {
      setActive(null);
    } else {
      setActive(id);
    }
  };

  const generateTemplate = (close: () => void) => {
    axiosInstance()
      .post<{ questionnaire_id: string }>("question/template/", { id: active })
      .then(() => {
        toast.success("یک پرسشنامه با قالب انتخاب شده ساخته شد");
        setFlag();
        close();
      })
      .catch((err) => errorHandler(err.response));
  };

  return (
    <Popup BoxStyle={{ width: 1080, zIndex: 20 }} dismisable onClose={onClose}>
      {(close) => (
        <ContainerPopup>
          <HeadPopup>
            <p>انتخاب قالب</p>
            <div onClick={close}>
              <Icon name="close" width={15} height={15} />
            </div>
          </HeadPopup>
          {!templates ? (
            <Loading>
              {error || (
                <SpinnerLoading color="#2979FF" width={70} height={70} />
              )}
            </Loading>
          ) : (
            <Body>
              {templates.results.map((template) => (
                <Template
                  key={template.id}
                  $active={template.id === active}
                  onClick={() => handleClick(template.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Title>
                      <p>موضوع قالب</p>
                      <h1>{template.title}</h1>
                    </Title>
                    <FootItem>
                      <div>
                        <Icon name="calender" width={22} height={22} />
                        آخرین بروزرسانی:
                      </div>
                      <p>{convertDate(template.created_at)}</p>
                    </FootItem>
                  </div>
                </Template>
              ))}
            </Body>
          )}
          {active && (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              style={{ position: "absolute", left: "24px", bottom: "24px" }}
              onClick={(e) => {
                e.stopPropagation();
                generateTemplate(close);
              }}
            >
              <BlueBtn>افزودن</BlueBtn>
            </motion.div>
          )}
        </ContainerPopup>
      )}
    </Popup>
  );
});

export default TemplatePopup;

const Body = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  overflow-y: auto;
  padding: 0 10px;
  padding-bottom: 10px;
`;

const Template = styled.div<{ $active: boolean }>`
  padding: 16px;
  display: flex;
  width: 100%;
  border: 1px solid
    ${(p) =>
      p.$active ? p.theme.colors.mainBack.main : p.theme.colors.neutral.e};
  background-color: ${(p) =>
    p.$active ? p.theme.colors.mainBack.main : "white"};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(p) =>
      p.$active ? p.theme.colors.mainBack.hover : p.theme.colors.neutral.hover};
    border: 1px solid
      ${(p) =>
        p.$active
          ? p.theme.colors.mainBack.hover
          : p.theme.colors.neutral.hover};
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 4px;

  h1 {
    color: ${(p) => p.theme.colors.neutral[3]};
    font-weight: 700;
    font-size: 18px;
  }

  p {
    color: ${(p) => p.theme.colors.neutral[6]};
    font-weight: 300;
    font-size: 12px;
  }
`;

const FootItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(p) => p.theme.colors.neutral.hover};
  padding: 4px 8px;
  border-radius: 6px;

  div {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #777;
    font-weight: 500;
    white-space: nowrap;
  }

  p {
    color: #444;
    font-weight: 700;
    font-size: 14px;
  }
`;

const Loading = styled.p`
  color: ${(p) => p.theme.colors.neutral[3]};
  font-size: 18px;
  font-weight: 500;
  display: flex;
  height: 100%;
  align-items: center;
  margin-top: -50px;
  width: 100%;
  justify-content: center;
`;
