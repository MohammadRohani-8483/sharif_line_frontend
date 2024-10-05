import { ChartCont, ChartTitle, LegendCont, Legends } from '@/src/styles/components/chartContainer'
import React, { memo, useCallback, useState } from 'react'
import chartIcons from '@/src/utils/jsons/chartIcons.json'
import ChartPopup from '../../popups/ChartPopup'
import { isOpen, T_ChartData, T_ChartMode } from '@/src/utils/types/global'
import colorsArr from '@/src/utils/jsons/colorsArr.json'
import { Overlay } from '@/src/styles/common'
import { closePopup } from '@/src/utils/functions/global'
import Table from '../../charts/Table'
import Circle from '../../charts/Circle'
import { handleChartData } from '@/src/utils/functions/charts'
import _ from 'lodash'
import LineChart from '../../charts/Line'
import { Icon } from '@/src/styles/common/icon'
import Horizontal from '../../charts/Horizontal'
import Vertical from '../../charts/Vertical'

type Props = {
  index: number
  mode: T_ChartMode
  data: T_ChartData
}
export type chartType = 'horizontalBar' | 'verticalBar' | 'circle' | 'line' | 'table'

const chartTypes: chartType[] = ['horizontalBar', 'verticalBar', 'circle', 'line', 'table']

const ChartContainer = ({ index, mode, data }: Props) => {
  const [openPopup, setOpenPopup] = useState<isOpen>({ open: false, visible: false })

  const chartData = handleChartData(data)

  const [type, setType] = useState<chartType>(chartTypes[index % 5])

  type ColorArrayType = typeof colorsArr;
  const color = useCallback((index: number) => {
    const key = (index % 7).toString();
    return colorsArr[key as keyof ColorArrayType]
  }, [index]);

  return (
    <ChartCont index={index} mode={mode}>
      <ChartTitle>
        <p className="index">{index}</p>
        <p className="title">{data.title || data.name}</p>
        <div
          onClick={() => {
            document.getElementById('scroll')?.classList.add('no-scroll')
            setOpenPopup({ open: true, visible: true })
          }}
        >
          <Icon name={chartIcons[type].icon} width={24} height={24} />
        </div>
      </ChartTitle>
      {type === 'circle' ?
        <Circle data={chartData} colors={color} />
        :
        type === 'verticalBar' ?
          <Vertical data={chartData} colors={color} />
          :
          type === 'horizontalBar' ?
            <Horizontal data={chartData} colors={color} />
            :
            type === 'line' ?
              <LineChart colors={color} data={chartData} />
              :
              type === 'table' &&
              <Table data={chartData} />
      }
      {
        type !== 'table' &&
        <Legends>
          {chartData.map((chart, i) => (
            <Legend color={color} count={chart.counts} index={i % 7} key={chart.id} title={chart.text} />
          ))}
          <Legend color={color} count={_.sumBy(chartData, 'counts')} index={7} title='کل' />
        </Legends>
      }
      {openPopup.open && <>
        <ChartPopup open={openPopup} setOpen={setOpenPopup} setType={setType} activeType={type} />
        <Overlay $zIndex={9}
          onClick={() => {
            closePopup(setOpenPopup)
            document.getElementById('scroll')?.classList.remove('no-scroll')
          }}
        />
      </>
      }
    </ChartCont>
  )
}

export default ChartContainer

type LegenProps = {
  title: string
  count: number
  index: number
  color: (index: number) => number[]
}
const Legend = memo(({ title, count, index, color }: LegenProps) => {
  const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1
  return (
    <LegendCont color={`rgb(${color(index).join()})`} bgcolor={`rgba(${color(index).join()},0.1)`}>
      <div style={{
        backgroundColor: `rgb(${color(index).join()})`,
        minHeight: "15px",
        minWidth: "15px",
        borderRadius: "4px"
      }} />
      <p>{title}</p>
      <p style={{ direction: isFirefox ? 'ltr' : 'rtl' }}>({count})</p>
    </LegendCont>
  )
})