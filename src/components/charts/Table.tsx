import { ChartTableCont } from '@/src/styles/components/chartContainer'
import { ChartResponse } from '@/src/utils/functions/charts'
import React from 'react'

const Table = ({ data }: { data: ChartResponse }) => {
  return (
    <ChartTableCont>
      <div className='head'>
        <h2 className='firstItem'>گزینه</h2>
        <h2>فراوانی پاسخ</h2>
        <h2>درصد فراوانی</h2>
      </div>
      {data.map(item => (
        <div className="item" key={item.id}>
          <p className='firstItem'>{item.text}</p>
          <p>{item.counts}</p>
          <p>{item.percentages.toFixed(1)}%</p>
        </div>
      ))}
    </ChartTableCont>
  )
}

export default Table