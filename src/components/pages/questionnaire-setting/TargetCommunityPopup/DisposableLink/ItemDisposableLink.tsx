import React from 'react'
import styled from 'styled-components'
import StatusDisposableLink from './StatusDisposableLink'
import copySvgIcon from '@/public/images/svg/Copy.svg'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { I_Link } from '@/src/utils/types/pages/questionnaireSetting'
import { convertDate } from '@/src/utils/functions/global'
function ItemDisposableLink(props:{className?:string,key:number, index:number , data:I_Link}) {
    let copyLinkHandler = ()=>{
        navigator.clipboard.writeText(props.data.link);
        toast.success('با موفقیت کپی شد')
    }
    
  return (
    <ItemDisposableLinkMain className={props.className}>
          <div className="item"><p>{props.index}</p></div>
    <div className="item"><p>{convertDate(props.data.created_at)}</p></div>
    <div className="item"><StatusDisposableLink status={props.data.is_used?'used':'unused'}/></div>
    <div className="item"><ItemDisposableLinkCopyBTN onClick={copyLinkHandler}><Image alt='کپی ایکون' src={copySvgIcon}></Image></ItemDisposableLinkCopyBTN><p>{props.data.token}</p></div>
    </ItemDisposableLinkMain>
  )
}

export default ItemDisposableLink
const ItemDisposableLinkMain = styled.div`
width: 100%;
display: flex;
height: 54px;
align-items: center;
align-self: stretch;
.item:nth-child(1){
    width: 60px;
}
.item:nth-child(2){
    width: 200px;
    gap: 24px;
}
.item:nth-child(3){
    width: 120px;
}
.item:nth-child(4){
    flex: 1;
    justify-content: flex-start;
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
const ItemDisposableLinkCopyBTN = styled.button`
display: flex;
padding: 8px;
align-items: center;
gap: 10px;
border-radius: 4px;
border: 1px solid var(--Gray-E, #EEE);
background: var(--White, #FFF);
cursor: pointer;
`

