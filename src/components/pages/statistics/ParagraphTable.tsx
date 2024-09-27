import { Paragraph } from '@/src/styles/components/resultsTable'
import { hideTooltip } from '@/src/utils/functions/global'
import { T_ShowTooltip } from '@/src/utils/types/global'
import { Answer, Question, Title } from '@/src/utils/types/pages/results'
import React, { useState } from 'react'
// import Tooltip from '../../common/Tooltip'

const ParagraphTable = ({ input }: { input: Question | Title | Answer }) => {
  const [isShowTooltip, setIsShowTooltip] = useState<T_ShowTooltip>({ axis: null, visible: false })
  const childs = 'answer_type' in input ? input.answer_type === 'O' ? input.options.length : 0 : 0
  const title = 'answer_type' in input ? input.title : 'answer' in input ? (input.answer || 'بدون پاسخ') : input.text
  const axis = 'answer' in input ? 'T' : 'B'
  return (
    <div
      onMouseOver={() => setIsShowTooltip({ axis, visible: true })}
      onMouseLeave={() => hideTooltip(setIsShowTooltip)}
      style={{ position: 'relative', width: 'fitContent', cursor: 'pointer' }}
    >
      <Paragraph
        childs={childs}
      >
        {title}
      </Paragraph>
      {title}


    </div>
  )
}

export default ParagraphTable