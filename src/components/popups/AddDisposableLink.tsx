import { ContainerPopup } from '@/src/styles/components/chartContainer'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Popup from '.'
import Image from 'next/image'
import closeBtn from '@/public/images/svg/close.svg'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/src/utils/helper/axios'
import { toast } from 'react-toastify'
function AddDisposableLinkPopup(props:{visible:boolean, onClose:()=>void,group_id:string}) {
let [createLinkNumberState,setCreateLinkNumberState]=useState<number>(1)
let addHandler = async ()=>{
  let Response: AxiosResponse<{detail:string}, any> = await axiosInstance().post('/answer/answerlink/',{ 
    group_id: props.group_id,
    num_links: createLinkNumberState
  });
  if(Response.status==201 ){
    toast(' با موفقیت افزوده شد')
  }
  props.onClose()
}
  return (
    <Popup BoxStyle={{ width: 400, zIndex: 20 }} dismisable onClose={props.onClose} >
<AddDisposableLinkPopupMain>
    <div className="nonebox"></div>
<Topic><p>ایجاد لینک یکبار مصرف</p>
<CloseBtn>

<Image src={closeBtn} alt='دکمه بسته شدن'></Image>
</CloseBtn>
</Topic>
<NumberLink>
    <p className="title">تعداد</p>
</NumberLink>
<NumberBox>

<NumberBoxBTNMinus onClick={()=>setCreateLinkNumberState(Number(createLinkNumberState-1))}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <rect x="0.5" y="0.5" width="39" height="39" rx="5.5" fill="#FAFAFA"/>
  <rect x="0.5" y="0.5" width="39" height="39" rx="5.5" stroke="#EEEEEE"/>
  <path d="M21 19C21 19 20.7732 19 20 19C19.2268 19 19 19 19 19H14.4C13.6268 19 13 19.2268 13 20C13 20.7732 13.6268 21 14.4 21H19C19 21 19.2268 21 20 21C20.7732 21 21 21 21 21H25.6C26.3732 21 27 20.7732 27 20C27 19.2268 26.3732 19 25.6 19H21Z" fill="#333333"/>
</svg></NumberBoxBTNMinus>
<input type="number" value={createLinkNumberState} onChange={(e:any)=>setCreateLinkNumberState(e.target.value)}/>
<NumberBoxBTNAdd onClick={()=>setCreateLinkNumberState(Number(createLinkNumberState+1))}>
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <rect x="0.5" y="0.5" width="39" height="39" rx="5.5" fill="#FAFAFA"/>
  <rect x="0.5" y="0.5" width="39" height="39" rx="5.5" stroke="#EEEEEE"/>
  <path d="M21 14.4C21 13.6268 20.7732 13 20 13C19.2268 13 19 13.6268 19 14.4V19H14.4C13.6268 19 13 19.2268 13 20C13 20.7732 13.6268 21 14.4 21H19V25.6C19 26.3732 19.2268 27 20 27C20.7732 27 21 26.2732 21 25.5V21H25.6C26.3732 21 27 20.7732 27 20C27 19.2268 26.3732 19 25.6 19H21V14.4Z" fill="#333333"/>
</svg>
</NumberBoxBTNAdd>

</NumberBox>
<BoxAddGroup>
<button onClick={()=>setCreateLinkNumberState(Number(createLinkNumberState+10))} className="BTNadd">۱۰+</button>
<button onClick={()=>setCreateLinkNumberState(Number(createLinkNumberState+100))} className="BTNadd">۱۰۰+</button>
<button onClick={()=>setCreateLinkNumberState(Number(createLinkNumberState+1000))} className="BTNadd">۱۰۰۰+</button>
</BoxAddGroup>
<AcceptBox>
  <button onClick={()=>addHandler()}><p>افزودن</p></button>
</AcceptBox>
</AddDisposableLinkPopupMain>
    </Popup>




 
      
    
  )
}

export default AddDisposableLinkPopup
const AddDisposableLinkPopupMain = styled.div`
display: flex;
width: 100%;
padding: 32px;
flex-direction: column;
align-items: flex-end;
gap: 8px;
position: relative;
.nonebox{
    height: 48px;
}
`

const Topic = styled.div`
display: flex;
align-items: flex-start;
width: 100%;
justify-content: space-between;
gap: 8px;
padding: 32px 32px 24px 32px;
position: absolute;
border-bottom: 1px solid #eee;
top: 0;
right: 0;
left: 0;
p{
    color: var(--Main, #2979FF);

font-size: 16px;

font-weight: 700;

}
`
const CloseBtn = styled.button`
cursor: pointer;
background-color: transparent;
`
const NumberLink = styled.div`
display: flex;
flex-direction: column;
width: 100%;
gap: 8px;
.title{
    color: var(--Gray-9, #999);
text-align: right;
font-size: 14px;
font-weight: 500;
}
`
const NumberBox = styled.div`
display: flex;
padding: 8px;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 4px;
border: 1px solid #EEE;
background: #FFF;
width: 100%;
input{
    flex: 1;
    text-align: center;
    -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`
const NumberBoxBTNMinus = styled.button`
width: 40px;
height: 40px;
fill: #FAFAFA;
stroke-width: 1px;
stroke: #EEE;
border-radius: 6px;
overflow: hidden;
`
const NumberBoxBTNAdd = styled.button`
width: 40px;
height: 40px;
fill: #FAFAFA;
stroke-width: 1px;
stroke: #EEE;
border-radius: 6px;
overflow: hidden;
`
const BoxAddGroup = styled.div`
display: flex; 
gap: 8px;
width: 100%;
.BTNadd{

display: flex;

padding: 8px 16px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 4px;
border: 1px solid var(--Gray-E, #EEE);
background: var(--Gray-FA, #FAFAFA);
color: var(--Gray-3, #333);
text-align: center;
font-size: 14px;
font-weight: 500;
line-height: normal;
cursor: pointer;
}
`
const AcceptBox = styled.button`
button{

  display: flex;
  padding: 8px 64px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
border-radius: 4px;
background: var(--Main, #2979FF);
width: 180px;
cursor: pointer;
p{
  color: var(--White, #FFF);

font-size: 16px;

font-weight: 500;
 
}
}
`
