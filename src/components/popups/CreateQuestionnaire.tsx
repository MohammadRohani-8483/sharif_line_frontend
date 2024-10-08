import React, { memo, useCallback, useState } from "react";
import Popup, { ContainerPopup, HeadPopup } from ".";
import { Icon } from "@/src/styles/common/icon";
import styled from "styled-components";
import Button from "../common/Button";
import Dropzone from "react-dropzone";
import { Text } from "@/src/styles/common";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { errorHandler } from "@/src/utils/functions/errorHandler";
import { axiosInstance } from "@/src/utils/helper/axios";
import Link from "next/link";
import { SpinnerLoading } from "../common/SpinnerLoading";

type Props = {
  onClose: () => void;
  open: boolean;
  id?: string;
  setFlag: () => void;
};

const CreateQuestionnaire = memo(({ onClose, open, id, setFlag }: Props) => {
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: Object) => {
      if (data) {
        let body: { form: Object; id?: string } = { form: data };
        if (id) body.id = id;
        await axiosInstance().post("question/form/", data);
      }
    },
    onSuccess: () => {
      setFlag();
      onClose();
    },
    onError: (error: AxiosError) => errorHandler(error.response),
  });

  const onDrop = useCallback((files: File[]) => {
    if (!files.length) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data: Object = JSON.parse(e.target?.result?.toString() || "");
      mutate(data);
    };
    reader.readAsText(file);
  }, []);

  if (!open) return <></>;
  return (
    <Popup
      BoxStyle={{ width: 550, zIndex: 5, height: 410 }}
      dismisable
      onClose={onClose}
    >
      {(close) => (
        <ContainerPopup>
          <HeadPopup>
            <p>افزودن پرسشنامه</p>
            <div onClick={close}>
              <Icon name="close" width={15} height={15} />
            </div>
          </HeadPopup>
          <Body>
            <Link href={isPending ? "" : "/"}>
              <Button
                disabled={isPending}
                style={{ padding: "16px 32px", fontWeight: 700 }}
              >
                ایجاد پرسشنامه
              </Button>
            </Link>
            <Dropzone onDrop={onDrop}>
              {(state) => (
                <FileCont
                  {...state.getRootProps()}
                  $isDrag={state.isDragActive}
                  $isLoading={isPending}
                >
                  <input {...state.getInputProps({ accept: ".json" })} />
                  {isPending ? (
                    <SpinnerLoading height={80} color="#2979FF" />
                  ) : (
                    <>
                      <Icon name="drag-drop" width={80} height={80} />
                      <Text
                        $color="#333"
                        style={{ display: "flex", padding: 10, gap: 4 }}
                      >
                        {state.isDragActive ? (
                          "رها کنید ..."
                        ) : (
                          <>
                            یا <Text $color="#2979FF">انتخاب</Text> کنید یا
                            بکشید و رها کنید
                          </>
                        )}
                      </Text>
                    </>
                  )}
                </FileCont>
              )}
            </Dropzone>
          </Body>
        </ContainerPopup>
      )}
    </Popup>
  );
});

export default CreateQuestionnaire;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
  padding: 16px;
  padding-top: 6px;
  gap: 8px;
`;

const FileCont = styled.div<{ $isDrag: boolean; $isLoading: boolean }>`
  width: 100%;
  height: 243px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid #eee;
  background: ${(p) => (p.$isDrag ? "#eee" : "#fafafa")};
  cursor: pointer;
  &:hover {
    background-color: ${(p) => (p.$isLoading ? "#fafafa" : "#eee")};
  }
`;
