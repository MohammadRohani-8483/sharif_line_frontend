import { Icon } from '@/src/styles/common/icon'
import { ChildrenTd, ItemTr, Paragraph, Table, TableCont } from '@/src/styles/components/resultsTable'
import { errorHandler } from '@/src/utils/functions/errorHandler'
import { convertDate, getHour, joinQueryStringParams } from '@/src/utils/functions/global'
import { axiosInstance } from '@/src/utils/helper/axios'
import { T_ResultResponse } from '@/src/utils/types/pages/results'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import Paginate from '../../common/Paginate'
import { Tooltip } from '../../common/Tooltip'
import SkletonTable from './SkletonTable'

const ResultsTable = ({ group }: { group: string }) => {
	const params = useParams()
	const [statusData, setStatusData] = useState<'load' | 'error' | 'success'>('load')
	const [resultsData, setResultsData] = useState<T_ResultResponse | null>(null)
	const [filter, setFilter] = useState<{ page: number, sort: 'created_at' | '-created_at' | '' }>({
		page: 1,
		sort: ''
	})
	const queries = useMemo(
		() =>
			"?" +
			joinQueryStringParams(filter),
		[filter]
	);


	const handleClickSort = () => {
		switch (filter.sort) {
			case 'created_at':
				return setFilter(p => ({ ...p, sort: '-created_at' }))
			case '-created_at':
				return setFilter(p => ({ ...p, sort: '' }))
			default: setFilter(p => ({ ...p, sort: 'created_at' }))
		}
	}

	useEffect(() => {
		setStatusData('load')
		if (typeof window !== 'undefined')
			document.getElementById('scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
		axiosInstance().get<T_ResultResponse>(`question/group-questionnaire/${group}/result/${params.questionnaireID}${queries}`)
			.then(res => {
				setResultsData(res.data)
				setStatusData('success')
			})
			.catch(err => {
				errorHandler(err.response)
				setStatusData('error')
			})
	}, [queries])

	const handleChangeBoolAnswer = (answer: string | number | null) => answer === 'True' ? 'بله' : answer === 'False' ? 'خیر' : answer

	return <>
		<TableCont>
			<Table no_success={statusData !== 'success' || resultsData?.results.length === 0} sort={filter.sort}>
				<tbody>
					{statusData === 'load' ?
						<SkletonTable />
						: statusData === 'success' ?
							resultsData?.results.length ?
								<>
									<tr>
										<td rowSpan={2} className='indexCount'>ردیف</td>
										<td rowSpan={2} onClick={handleClickSort} style={{ cursor: 'pointer' }}>
											<p className='sort'>
												زمان ثبت
											</p>
										</td>
										{resultsData.questions.map((question, i) =>
											<td key={question.id}
												rowSpan={question.answer_type === 'O' ? 1 : 2}
												colSpan={question.answer_type === 'O' ? question.options.length : 1}
											>
												<Tooltip clickable title={question.title} anchorClassName={'question-' + question.id} placement='bottom'>
													<Paragraph
														style={{ cursor: 'pointer' }}
														childs={question.answer_type === 'O' ? question.options.length : 0}
														className={'question-' + question.id}
													>
														{question.title}
													</Paragraph>
												</Tooltip>
											</td>
										)}
									</tr>
									<tr>
										{resultsData?.questions.map(question => {
											if (question.answer_type === 'O')
												return question.options.map(option => (
													<ChildrenTd key={option.id}>
														<Tooltip clickable title={option.text} anchorClassName={'option-' + option.id} placement='bottom'>
															<Paragraph ischild className={'option-' + option.id} style={{ cursor: 'pointer' }}>
																{option.text}
															</Paragraph>
														</Tooltip>
													</ChildrenTd>
												))
										})}
									</tr>
									{resultsData?.results.map((answerset, i) => (
										<ItemTr key={i}>
											<td className='index'>{(filter.page - 1) * 10 + (i + 1)}</td>
											<td className='date'>
												{convertDate(answerset.created_at)}
												<br />
												{getHour(new Date(answerset.created_at))}
											</td>
											{answerset.result.map((answer, j) => {
												if (answer.type === 'option')
													return answer.question.options.map((option, i) => {
														if (answer.options?.includes(option.id))
															return <ChildrenTd key={i}>
																<Icon name='tick' width={18} height={18} />
															</ChildrenTd>
														else
															return <td key={i}></td>
													}
													)
												else
													return <td key={j}>
														<Tooltip title={handleChangeBoolAnswer(answer.answer) || '-'}
															anchorClassName={'answer-' + j + `-${i}`}
															placement='bottom'>
															<Paragraph className={'answer-' + j + `-${i}`}>
																{handleChangeBoolAnswer(answer.answer) || '-'}
															</Paragraph>
														</Tooltip>
													</td>
											})}
										</ItemTr>
									))}
								</>
								:
								<section>هیچ نتیجه ای برای این پرسشنامه وجود ندارد</section>
							:
							<section>در دریافت اطلاعات مشکلی پیش آمده</section>
					}
				</tbody>
			</Table>
		</TableCont>
		{
			statusData === 'success' &&
			<Paginate
				itemsCount={resultsData?.count || 0}
				activePage={filter.page}
				pageSize={10}
				setPage={(page) => setFilter(p => ({ ...p, page }))}
			/>
		}
	</>
}

export default ResultsTable