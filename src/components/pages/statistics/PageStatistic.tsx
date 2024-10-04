"use client";
import { PageCont } from "@/src/styles/common";
import { Icon } from "@/src/styles/common/icon";
import { ModeCont, Questionnaires } from "@/src/styles/pages/questionnaire";
import { TitleStatge } from "@/src/styles/pages/statistics";
import { T_ChartMode, T_ChartResponse, T_Mode } from "@/src/utils/types/global";
import { I_GroupData } from "@/src/utils/types/pages/questionnaire";
import { Fragment, useCallback, useMemo, useState } from "react";
import Paginate from "../../common/Paginate";
import ModeSelect from "../questionnaire-list/ModeSelect";
import ChartContainer from "./ChartContainer";
import HeaderPage from "./HeaderPage";
import ResultsTable from "./ResultsTable";
import { usePDF } from "react-to-pdf";
import { toast } from "react-toastify";
import { paginate } from "@/src/utils/functions/paginate";
import { useParams, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/src/utils/helper/axios";
import { errorHandler } from "@/src/utils/functions/errorHandler";
import { download } from "@/src/utils/functions/global";

export type Props = {
  charts: T_ChartResponse;
  versions: I_GroupData;
};

const chartPageSize = 18;

const PageStatistic = ({ charts, versions }: Props) => {
  const searchParams = useSearchParams();
  const params = useParams();

  const resultsStage = useMemo(
    () => !!searchParams.get("result_stage") || false,
    [searchParams]
  );
  const groupId = useMemo(
    () => searchParams.get("group_id") || "0",
    [searchParams]
  );

  const [extractLoading, setExtractLoading] = useState(false);

  const [chartMode, setChartMode] = useState<T_ChartMode>("MESSED");
  const containerMode: T_Mode = useMemo(
    () => (chartMode === "ROW" ? "ROW" : "MIXED"),
    [chartMode]
  );

  const [chartPage, setChartPage] = useState(1);

  const { toPDF, targetRef } = usePDF({
    filename: "charts.pdf",
    page: { margin: 4 },
  });
  const extract = useCallback(() => {
    setExtractLoading(true);
    if (resultsStage) {
      axiosInstance()
        .get(
          `question/group-questionnaire/${groupId}/result/${params.questionnaireID}/export_excel`,
          { responseType: "blob" }
        )
        .then((res) => {
          let url = URL.createObjectURL(res.data);
          download(url, "export records");
          toast.success("خروجی جدول نتایج با موفقیت دانلود شد");
        })
        .catch((err) => errorHandler(err.response))
        .finally(() => setExtractLoading(false));
    } else if (charts.result.length > 0) {
      toPDF();
      setExtractLoading(false);
    } else {
      toast.error("هیچ نموداری جهت خروجی گرفتن وجود ندارد");
      setExtractLoading(false);
    }
  }, [resultsStage, charts]);

  return (
    <PageCont>
      <HeaderPage
        title={charts.title}
        extractFunc={extract}
        extractLoading={extractLoading}
        versions={versions}
      />
      <TitleStatge>
        <section style={{ width: "100%" }}>
          <Icon
            name={resultsStage ? "document_color" : "chart_color"}
            width={24}
            height={24}
          />
          <p className="title">{resultsStage ? "نتایج" : "نمودار ها"}</p>
          <div className="line" />
        </section>
        <section className="version-d">
          {!resultsStage && (
            <ModeCont className="modes">
              <ModeSelect
                onClick={() => setChartMode("ROW")}
                active={chartMode === "ROW"}
                icon="row_mode"
              />
              <ModeSelect
                onClick={() => setChartMode("MIXED")}
                active={chartMode === "MIXED"}
                icon="mixed_mode"
              />
              <ModeSelect
                onClick={() => setChartMode("MESSED")}
                active={chartMode === "MESSED"}
                icon="messed_mode"
              />
            </ModeCont>
          )}
        </section>
      </TitleStatge>
      <Fragment>
        {resultsStage ? (
          <ResultsTable group={groupId} />
        ) : (
          <Fragment>
            {charts.result.length ? (
              <Fragment>
                <Questionnaires
                  ref={targetRef}
                  mode={containerMode}
                  count={Math.min(
                    charts.result.length - (chartPage - 1) * chartPageSize,
                    chartPageSize
                  )}
                >
                  {paginate(charts.result, chartPage, chartPageSize).map(
                    (chart, i) => (
                      <ChartContainer
                        key={i}
                        data={chart}
                        index={(chartPage - 1) * chartPageSize + (i + 1)}
                        mode={chartMode}
                      />
                    )
                  )}
                </Questionnaires>
                <Paginate
                  activePage={chartPage}
                  itemsCount={charts.result.length}
                  pageSize={chartPageSize}
                  setPage={(page) => setChartPage(page)}
                />
              </Fragment>
            ) : (
              <p
                style={{
                  fontSize: "16px",
                  textAlign: "center",
                  marginTop: "40px",
                }}
              >
                نموداری جهت نمایش وجود ندارد
              </p>
            )}
          </Fragment>
        )}
      </Fragment>
      <div style={{ height: "40px" }} />
    </PageCont>
  );
};

export default PageStatistic;
