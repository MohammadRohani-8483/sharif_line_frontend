import React from 'react'
import styled from 'styled-components'
import settings from '@/public/images/svg/settings.svg'
import chart from '@/public/images/svg/chart.svg'
import documentText from '@/public/images/svg/document_text.svg'
import eye from '@/public/images/svg/eye.svg'
import CheckSquare from '@/public/images/svg/CheckSquare.svg'
import CheckSquareBlack from '@/public/images/svg/Check SquareBlack.svg'
import Image from 'next/image'
import { T_Version } from '@/src/utils/types/pages/questionnaire'
import { convertDate } from '@/src/utils/functions/global'
import Link from 'next/link'
import { Tooltip } from '@/src/components/common/Tooltip'
function ItemVersion(props:{data:T_Version,qroup_id:string,setActiveVersion:any; isActive:boolean}) {

  return (
    <ItemVersionStyle className='itemVersion'>
                <div className="item"><p>{props.data.version}</p> 
                {props.isActive?
                <div className="bluLine"></div>
                :null
            }
                
                </div>
    <div className="item"><p>{convertDate(props.data.created_at)}</p> </div>
    <div className="item"><p>{props.data.description}</p></div>
   <BtnBox>
   <BTNactive onClick={()=>props.setActiveVersion(props.data.version)} active={props.isActive}>
    {props.isActive?
    <Image alt='فعال کردن پرسشنامه' src={CheckSquare}></Image>
    :    
    <Image alt='فعال کردن پرسشنامه' src={CheckSquareBlack}></Image>
}
    </BTNactive>
   <Tooltip
              title={"مشاهده"}
              anchorClassName={"chart"}
              placement={"bottom"}
            >

   <BTN href={`/21`}>
    <Image alt='مشاهده' src={eye}></Image>
    </BTN>
            </Tooltip>
   <BTN target='_blank' href={`/${props.data.id}/statistics?group_id=${props.qroup_id}&result_stage=true`}>
    <Image alt='نتایج' src={documentText}></Image>
    </BTN>
   <BTN  target='_blank' href={`/${props.data.id}/statistics?group_id=${props.qroup_id}`}>
    <Image alt='چارت' src={chart}></Image>
    </BTN>
    <BTN href={`${window.location.href}/${props.data.id}`}>
    <Image alt='تنظیمات' src={settings}></Image>
    </BTN>


   </BtnBox>
    </ItemVersionStyle>
  )
}

export default ItemVersion
const ItemVersionStyle = styled.div`
width: 100%;
display: flex;
height: 54px;
align-items: center;
align-self: stretch;
.item:nth-child(1){
    width: 120px;
    position: relative;

    .bluLine{
        height: 100%;
        width: 5px;
        background-color: #2979ff;
        position: absolute;
        right: 0;
        border-radius: 6px 0 0 6px;
    }
}
.item:nth-child(2){
    width: 140px;
}
.item:nth-child(3){
    flex: 1;
    justify-content: start;
}
.item{
    display: flex;
padding: 16px;
justify-content: center;
align-items: center;
gap: 8px;
border-left: 1px solid #EEEEEE;

p{
    color: var(--Gray-3, #333);
text-align: right;
font-size: 16px;

font-weight: 500;

}
}
`
const BtnBox = styled.div`
display: flex;
gap: 8px;
padding: 8px 8px;
`
const BTN = styled(Link)<{active?:boolean}>`
display: flex;
padding: 12px;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 8px;
border: ${p=>p.active?'1px solid rgba(41, 121, 255, 0.10)':'1px solid #EEE'};
background: ${p=>p.active?'rgba(41, 121, 255, 0.10)':'#FFF'};

`
const BTNactive = styled.button<{active?:boolean}>`
display: flex;
padding: 12px;
flex-direction: column;
cursor: pointer;

justify-content: center;
align-items: center;
border-radius: 8px;
border: ${p=>p.active?'1px solid rgba(41, 121, 255, 0.10)':'1px solid #EEE'};
background: ${p=>p.active?'rgba(41, 121, 255, 0.10)':'#FFF'};

`
