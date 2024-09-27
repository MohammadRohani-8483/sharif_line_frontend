import PageStatistic from '@/src/components/pages/statistics/PageStatistic'
import { axiosInstance } from '@/src/utils/helper/axios'
import { Tokens } from '@/src/utils/store/slices/base'
import { T_ChartResponse } from '@/src/utils/types/global'
import { I_VersionsList } from '@/src/utils/types/pages/questionnaire'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

const StatisticsPage = async ({ params, searchParams }: { params: { questionnaireID: string }, searchParams: { group_id: string } }) => {
	const tokens: Tokens = {
    access: cookies().get('access')?.value || null,
    refresh: cookies().get('refresh')?.value || null
  }

	let chartData: T_ChartResponse | null = null
	let versionsList: I_VersionsList | null = null
	try {
		const { data } = await axiosInstance(tokens).get<T_ChartResponse>(`question/group-questionnaire/${searchParams.group_id}/questionnaire/${params.questionnaireID}/plot/`)
		chartData = data
	} catch (error) {
		console.log(error)
		notFound()
	}
	try {
		const { data: versionsData } = await axiosInstance(tokens).get<I_VersionsList>(`question/group-questionnaire/${searchParams.group_id}/`)
		versionsList = versionsData
	} catch (error) {
		console.log(error)
		notFound()
	}
	return (
		<PageStatistic charts={chartData!} versions={versionsList!} />
	)
}

export default StatisticsPage