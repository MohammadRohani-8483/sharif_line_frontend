import { Icon } from '@/src/styles/common/icon'
import { Buttons, Container, ExportBtn, Title, TitleAndButtons } from '@/src/styles/components/HeaderStatistics'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { SpinnerLoading } from '../../common/SpinnerLoading'
import { Tooltip } from '../../common/Tooltip'

type Props = {
	isResultsStage: boolean
	changeStage: () => void
	extractFunc: () => void
	copyFunc: () => void
	title: string
	groupSlug: string
	extractLoading: boolean
}

const HeaderPage = ({ isResultsStage, changeStage, extractFunc, title, copyFunc, extractLoading, groupSlug }: Props) => {
	// const params=useParams()

	return (
		<Container>
			<TitleAndButtons>
				<Title>
					<p>موضوع پرسشنامه</p>
					<h1>{title}</h1>
				</Title>
				<Buttons>
					<Tooltip title={isResultsStage ? 'نمودار' : 'لیست نتایج'} placement='bottom' anchorClassName='results-and-charts'>
						<section onClick={changeStage} className='results-and-charts'>
							<Icon name={isResultsStage ? "chart" : "document_text"} width={24} height={24} />
						</section>
					</Tooltip>
					<Tooltip title='مشاهده' placement='bottom' anchorClassName='show'>
						<Link href={`/${groupSlug}/answer`} className='show'>
							<Icon name='eye' width={24} height={24} />
						</Link>
					</Tooltip>
					<Tooltip title='اشتراک گذاری' placement='bottom' anchorClassName='share'>
						<section className='share' onClick={() => copyFunc()}>
							<Icon name='share' width={24} height={24} />
						</section>
					</Tooltip>
					<Tooltip title='ویرایش' placement='bottom' anchorClassName='edit'>
						<Link href='/form' className='edit'>
							<Icon name='pen' width={24} height={24} />
						</Link>
					</Tooltip>
				</Buttons>
			</TitleAndButtons>
			<ExportBtn onClick={extractFunc}>
				{extractLoading ?
					<div style={{
						width: '140px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
					>
						<SpinnerLoading color='#2979FF' width={30} height={30} />
					</div>
					:
					<>
						<p>خروجی گرفتن</p>
						<Icon name='download' width={24} height={24} />
					</>}
			</ExportBtn>
		</Container>
	)
}

export default HeaderPage