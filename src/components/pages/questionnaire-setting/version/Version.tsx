import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import AddSquare from '@/public/images/svg/AddSquare.svg'
import ItemVersion from './ItemVersion'
import { T_Version } from '@/src/utils/types/pages/questionnaire'

function Version(props:{data?:T_Version[] | undefined  ;setActiveVersion:(number:number)=>void; activeVersion:number | undefined}) {
  return (
    <ContainerVersion>
<Topic>

      <p className='title'>نسخه های پرسشنامه</p>
      <button>
        <p>افزودن</p>
        <Image alt='افزودن' src={AddSquare}></Image>
      </button>

</Topic>
<TableVersionContainer>
<TableVersion>
<TopicTable className='itemIable'>
    <div className="item"><p>شماره نسخه</p></div>
    <div className="item"><p>زمان ایجاد</p></div>
    <div className="item"><p>توضیحات</p></div>

</TopicTable>
{props.data?.map((item)=><ItemVersion setActiveVersion={props.setActiveVersion} isActive={props.activeVersion == item.version} data={item}/>)}

</TableVersion>
</TableVersionContainer>
    </ContainerVersion>
  )
}

export default Version
const ContainerVersion = styled.div`
padding-top: 8px;
display: flex;

flex-direction: column;

gap: 8px;
align-self: stretch;
.title{
    color: var(--Gray-3, #333);


font-size: 16px;

font-weight: 500;

}
`
const Topic = styled.div`
display: flex;
align-items: center;
width: 100%;
justify-content: space-between;
button{
    display: flex;
padding: 8px;
justify-content: center;
align-items: center;
gap: 8px;

border-radius: 4px;
background: var(--Main10, rgba(41, 121, 255, 0.10));
p{

    color: var(--Main, #2979FF);
text-align: right;

font-size: 16px;

font-weight: 500;

}
}
`
const TableVersionContainer = styled.div`
width: 100%;
overflow-y: hidden;
`
const TableVersion = styled.div`
display: flex;
min-width: 800PX;
flex-direction: column;
align-self: stretch;
border-radius: 8px;
border: 1px solid var(--Gray-E, #EEE);
background: var(--White, #FFF);
.itemVersion:nth-child(even){
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
    width: 120px;
}
.item:nth-child(2){
    width: 140px;
}
.item:nth-child(3){
    flex: 1;
    justify-content: start;
}
`