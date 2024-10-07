import { Buttons } from '@/src/styles/pages/questionnaire'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import DownloadMinimalistic from '@/public/images/svg/Download Minimalistic.svg'
import AddSquare from '@/public/images/svg/AddSquare.svg'
import ItemDisposableLink from './ItemDisposableLink'
import AddDisposableLinkPopup from '@/src/components/popups/AddDisposableLink'
import { I_Link } from '@/src/utils/types/pages/questionnaireSetting'
function DisposableLink(props:{status:boolean,data:I_Link[] | undefined,group_id:string}) {
    let [popupLinkState,setPopupLinkState ]= useState(false)
    let exportExel = ()=>{
        window.open(` /api/answer/answerlink/${props.group_id}/export_to_excel`, '_blank');
       
    }
  return (
    <DisposableLinkMain status={props.status}>
        {popupLinkState?
        
        <AddDisposableLinkPopup group_id={props.group_id} onClose={()=>setPopupLinkState(false)} visible={popupLinkState}  ></AddDisposableLinkPopup>
    :null}

<TopicDisposableLink   >

      <p className='title'>لینک یبار مصرف</p>
      <BtnsBox>


      <ExportDisposableLinkBTN onClick={()=>exportExel()}>
         <Image  alt='خروجی اکسل' src={DownloadMinimalistic} ></Image>
        <p>خروجی اکسل</p>
         </ExportDisposableLinkBTN>
         <CreateDisposableLinkBTN onClick={()=>setPopupLinkState(true)}>
         <Image  alt='خروجی اکسل' src={AddSquare} ></Image>
         <p>ایجاد لینک</p>
         </CreateDisposableLinkBTN>
      </BtnsBox>
         
</TopicDisposableLink>
<TableVersionContainer>


<TableDisposableLink>
<TopicTable className='itemIable'>
    <div className="item"><p>ردیف</p></div>
    <div className="item"><p>زمان ایجاد</p></div>
    <div className="item"><p>وضعیت</p></div>
    <div className="item"><p>لینک</p></div>
</TopicTable>
{props.data?.map((item,index)=><ItemDisposableLink index={index+1} data={item} key={1} className={'itemIable'}/>)}



</TableDisposableLink>
</TableVersionContainer>
    </DisposableLinkMain>
  )
}

export default DisposableLink
const DisposableLinkMain = styled.div<{status:boolean}>`
height: ${p=>p.status?'fit-content':'0'};
overflow: hidden;
opacity: ${p=>p.status?'1':'0'};
.title{
    color: var(--Gray-3, #333);
text-align: right;

font-size: 16px;
font-weight: 500;
}
`
const TopicDisposableLink = styled.div`
width: 100%;
padding: 16px 0;
display: flex;
align-items: center;
gap: 16px;
min-width: 1000px;
@media screen and (max-width:800px) {
flex-direction    :column ;
align-items: flex-start;

}
.title{
    flex: 1;
    height: min-content;
}
`
const TableVersionContainer = styled.div`
width: 100%;
overflow-y: hidden;
`
const BtnsBox = styled.div`
display: flex;
align-items: center;
gap: 16px;
`

const ExportDisposableLinkBTN = styled.button`
display: flex;
padding: 8px;
justify-content: center;
align-items: center;
gap: 8px;
background-color: transparent;
p{
    color: #2979ff;
}
cursor: pointer;
`
const CreateDisposableLinkBTN = styled.button`
display: flex;
padding: 8px;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 4px;
cursor: pointer;

background: var(--Main10, rgba(41, 121, 255, 0.10));
p{
    color: #2979ff;
}
`
const TableDisposableLink = styled.div`
display: flex;
@media screen and (max-width:800px) {
    width: fit-content;

}
flex-direction: column;
align-self: stretch;
border-radius: 8px;
border: 1px solid var(--Gray-E, #EEE);
background: var(--White, #FFF);
.itemIable:nth-child(even){
background-color: #fafafa;
}
`

const TopicTable = styled.div`
display: flex;
align-items: center;
justify-content: center;
align-self: stretch;

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
.item:nth-child(1){
    width: 60px;
}
.item:nth-child(2){
    width: 200px;
}
.item:nth-child(3){
    width: 120px;
}
.item:nth-child(4){
    flex: 1;
    justify-content: flex-start;
}
`
const ItemTable = styled.div`

`
