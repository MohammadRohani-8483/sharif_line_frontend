'use client'
import { PageCont } from "@/src/styles/common"
import { Icon } from "@/src/styles/common/icon"
import { ModeCont, Questionnaires } from "@/src/styles/pages/questionnaire"
import { TitleStatge } from "@/src/styles/pages/statistics"
import { T_ChartMode, T_ChartResponse, T_Mode } from "@/src/utils/types/global"
import { I_VersionsList, T_Version } from "@/src/utils/types/pages/questionnaire"
import { Fragment, useCallback, useMemo, useState } from "react"
import Dropdown from "../../common/Dropdown"
import Paginate from "../../common/Paginate"
import ModeSelect from "../questionnaire-list/ModeSelect"
import ChartContainer from "./ChartContainer"
import HeaderPage from "./HeaderPage"
import ResultsTable from "./ResultsTable"
import { usePDF } from 'react-to-pdf';
import { toast } from "react-toastify"
import { paginate } from "@/src/utils/functions/paginate"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { axiosInstance } from "@/src/utils/helper/axios"
import { errorHandler } from "@/src/utils/functions/errorHandler"
import { download } from "@/src/utils/functions/global"

export type Props = {
	charts: T_ChartResponse
	versions: I_VersionsList
}

const chartPageSize = 18

const PageStatistic = ({ charts, versions }: Props) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const params = useParams()
	const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

	const resultsStage = useMemo(() => !!searchParams.get('result_stage') || false, [searchParams])
	const groupId = useMemo(() => searchParams.get('group_id') || '0', [searchParams])
	const { replace } = useRouter()

	const [extractLoading, setExtractLoading] = useState(false)

	const [chartMode, setChartMode] = useState<T_ChartMode>('MESSED')
	const containerMode: T_Mode = useMemo(() => chartMode === "ROW" ? 'ROW' : "MIXED", [chartMode])

	const [activeVersions, setActiveVersions] = useState<T_Version>(versions?.versions.find(version => version.id === params.questionnaireID)!)
	const [chartPage, setChartPage] = useState(1)

	const { toPDF, targetRef } = usePDF({ filename: 'charts.pdf', page: { margin: 4 } });
	const extract = useCallback(() => {
		setExtractLoading(true)
		if (resultsStage) {
			axiosInstance().get(`question/group-questionnaire/${groupId}/result/${params.questionnaireID}/export_excel`,
				{ responseType: "blob" }
			)
				.then(res => {
					let url = URL.createObjectURL(res.data);
					download(url, 'export records')
					toast.success('خروجی جدول نتایج با موفقیت دانلود شد')
				})
				.catch(err => errorHandler(err.response))
				.finally(() => setExtractLoading(false))
		} else if (charts.result.length > 0) {
			toPDF()
			setExtractLoading(false)
		} else {
			toast.error('هیچ نموداری جهت خروجی گرفتن وجود ندارد')
			setExtractLoading(false)
		}
	}, [resultsStage, charts])

	const changeStage = useCallback(() => {
		const url = `${pathname}?group_id=${groupId}${resultsStage ? '' : `&result_stage=true`}`
		replace(url)
	}, [pathname, groupId, resultsStage])

	const copyURL = useCallback(
		() => {
			navigator?.clipboard.writeText(`${origin}/${charts.group_slug}/answer`)
			toast.success('لینک پرسشنامه با موفقیت کپی شد')
		},
		[origin, params],
	)

	return (
		<PageCont>
			<HeaderPage
			groupSlug={charts.group_slug}
				copyFunc={copyURL}
				title={charts.title}
				isResultsStage={resultsStage}
				changeStage={() => changeStage()}
				extractFunc={extract}
				extractLoading={extractLoading}
			/>
			<TitleStatge>
				<section style={{ width: '100%' }}>
					<Icon name={resultsStage ? "document_color" : "chart_color"} width={24} height={24} />
					<p className="title">{resultsStage ? "نتایج" : "نمودار ها"}</p>
					<div className="line" />
					<section className="version-d">
						<p className="title">نسخه بروزرسانی:</p>
						<Dropdown groupId={groupId} isResultStage={resultsStage} options={versions.versions} activeOption={activeVersions} setActiveOption={version => setActiveVersions(version)} />
					</section>
				</section>
				<section className="version-d">
					{!resultsStage &&
						<ModeCont className="modes">
							<ModeSelect
								onClick={() => setChartMode('ROW')}
								active={chartMode === 'ROW'}
								icon='row_mode'
							/>
							<ModeSelect
								onClick={() => setChartMode('MIXED')}
								active={chartMode === 'MIXED'}
								icon='mixed_mode'
							/>
							<ModeSelect
								onClick={() => setChartMode('MESSED')}
								active={chartMode === 'MESSED'}
								icon='messed_mode'
							/>
						</ModeCont>
					}
				</section>
			</TitleStatge>
			<Fragment>
				{resultsStage ?
					<ResultsTable group={groupId} />
					:
					<Fragment>
						{charts.result.length ?
							<Fragment>
								<Questionnaires ref={targetRef} mode={containerMode} count={Math.min(charts.result.length - ((chartPage - 1) * chartPageSize), chartPageSize)}>
									{/* {charts.result.splice((chartPage - 1) * chartPageSize, chartPageSize).map((chart, i) => (
										<ChartContainer key={i} data={chart} index={(chartPage - 1) * chartPageSize + (i + 1)} mode={chartMode} />
									))} */}
									{paginate(charts.result, chartPage, chartPageSize).map((chart, i) => (
										<ChartContainer
											key={i} data={chart}
											index={(chartPage - 1) * chartPageSize + (i + 1)}
											mode={chartMode}
										/>
									))}
									{/* {Array(58).fill(1).map((_, i) => (
										<ChartContainer key={i} data={charts.result[0]} index={i + 1} mode={chartMode} />
									))} */}
								</Questionnaires>
								<Paginate
									activePage={chartPage}
									itemsCount={charts.result.length}
									pageSize={chartPageSize}
									setPage={(page) => setChartPage(page)}
								/>
							</Fragment>
							:
							<p style={{ fontSize: '16px', textAlign: 'center', marginTop: '40px' }}>
								نموداری جهت نمایش وجود ندارد
							</p>
						}
					</Fragment>
				}
			</Fragment>
			<div style={{ height: '40px' }} />
		</PageCont>
	)
}

export default PageStatistic