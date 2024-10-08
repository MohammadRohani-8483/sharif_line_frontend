import { Icon } from "@/src/styles/common/icon";
import { Container, ExportBtn } from "@/src/styles/components/HeaderStatistics";
import React from "react";
import { SpinnerLoading } from "../../common/SpinnerLoading";
import { I_GroupData } from "@/src/utils/types/pages/questionnaire";
import { HeaderQuestionnaire } from "../../common/HeaderQuestionnaire";

type Props = {
  extractFunc: () => void;
  title: string;
  extractLoading: boolean;
  versions: I_GroupData;
};

const HeaderPage = ({
  extractFunc,
  title,
  extractLoading,
  versions,
}: Props) => {
  return (
    <Container>
      <HeaderQuestionnaire title={title} groupData={versions} />
      <ExportBtn onClick={extractFunc}>
        {extractLoading ? (
          <div
            style={{
              width: "140px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SpinnerLoading color="#2979FF" width={30} height={30} />
          </div>
        ) : (
          <>
            <p>خروجی گرفتن</p>
            <Icon name="download" width={24} height={24} />
          </>
        )}
      </ExportBtn>
    </Container>
  );
};

export default HeaderPage;
