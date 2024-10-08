"use client"
import Paginate from '@/src/components/common/Paginate';
import { SpinnerLoading } from '@/src/components/common/SpinnerLoading';
import Tick from '@/src/components/common/Tick';
import { TargetSectionLoading } from '@/src/components/pages/questionnaire-setting/loading/TargetSectionLoading';
import { TimerCalculator } from '@/src/components/pages/questionnaire-setting/QuestionnaireTimingSection';
import DisposableLink from '@/src/components/pages/questionnaire-setting/TargetCommunityPopup/DisposableLink/DisposableLink';
import { TargetCommunitySection } from '@/src/components/pages/questionnaire-setting/TargetCommunitySection';
import { TargetLinkSection } from '@/src/components/pages/questionnaire-setting/TargetLinkSection';
import Version from '@/src/components/pages/questionnaire-setting/version/Version';
import AddDisposableLinkPopup from '@/src/components/popups/AddDisposableLink';
import CreateQuestionnaire from '@/src/components/popups/CreateQuestionnaire';
import { TargetCommunityCheckbox } from '@/src/styles/pages/questionnaire-setting';
import { QuestionnaireTimingContainer, QuestionnaireTitle, TimingSection } from '@/src/styles/pages/questionnaire-setting/page';
import { axiosInstance } from '@/src/utils/helper/axios';

import { I_ApiConditionResponse, I_ApiLinkResponse, I_ApiQSSettingResponse, I_Condition, I_Link, T_Group_idInitialDataType, T_QuestionnaireInitialDataType } from '@/src/utils/types/pages/questionnaireSetting';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';

function Page({ params }: { params: { Id: string ,questionnaireID:string } })  {
console.log(params.questionnaireID);

    const [questionnaireData, setQuestionnaireData] = useState<T_Group_idInitialDataType>();
    const [DisposableLinkData, setDisposableLinkData] = useState<I_ApiLinkResponse >();
    const [activeVersion, setActiveVersion] = useState<number >();
    const [isLoginRequired,setIsLoginRequired]=useState(false)
    let [title,setQuestionnaireTitle]=useState("")
    let [loadingSave,setLoadingSaveState]=useState<boolean>(false)
    let [popupLinkState,setPopupLinkState ]= useState(false)
    const [open, setOpen] = useState(false);

    const [flag, setFlag] = useState(false);
const chengeHandlerPopup=()=>{
  setPopupLinkState((prev)=>!prev)
}
    const clickHandle = () => {setOpen((p) => !p)
      QSSettingQuery.refetch()

    };
    useEffect(()=>{
      QSLinkQuery.refetch()
    },[popupLinkState])
    const questionnaireURL = `/question/group-questionnaire/${params.questionnaireID}`
    let LinkURL = `/answer/answerlink/${params.questionnaireID}`


    let [activeOrNot,setQuestionnaireActive]=useState(true)
    
const chengePage=(page:number)=>{
    LinkURL=`/answer/answerlink/${params.questionnaireID}`+'/?page='+page
    QSLinkQuery.refetch()
}
    const QSSettingQuery: UseQueryResult<AxiosResponse<I_ApiQSSettingResponse, AxiosError>> = useQuery({
        queryKey: ['QSSettingQuery'],
        queryFn: async () => {
            let Response: AxiosResponse<T_Group_idInitialDataType, any> = await axiosInstance().get(questionnaireURL);
            setQuestionnaireData(Response.data)
            setQuestionnaireActive(Response.data.is_active)
            setActiveVersion(Response.data.active_version)
            setQuestionnaireTitle(Response.data.title)
      
            return Response;
        },
    })
    const QSLinkQuery: UseQueryResult<AxiosResponse<I_ApiLinkResponse, AxiosError>> = useQuery({
        queryKey: ['QSLinkQuery'],
        queryFn: async () => {
            let Response: AxiosResponse<I_ApiLinkResponse, any> = await axiosInstance().get(LinkURL);
            setDisposableLinkData(Response.data)
            
            return Response;
        },
    })
let PatchHandler=async () => {
  setLoadingSaveState(true)
    let Response: AxiosResponse<T_Group_idInitialDataType, any> = await axiosInstance().patch(questionnaireURL, {
        is_active:activeOrNot,
        active_version:activeVersion,
        title:title,
        is_required_login:isLoginRequired
    });
    if(Response.status == 200){
        toast.success('با موفقیت تغییر کرد')
    }
    setLoadingSaveState(false)

    setQuestionnaireActive(Response.data.is_active)
    setActiveVersion(Response.data.active_version)

}
  return (
    <ContainerQuestionnairePage>
            <CreateQuestionnaire
        open={open}
        id={params.questionnaireID}
        onClose={() => clickHandle()}
        setFlag={() => setFlag((p) => !p)}
      />
      <QuestionnaireTimingContainer>
        <TimingSection className={'titleSection'}>
            <p className={'regular-title'}>نام پرسشنامه</p>
            <QuestionnaireTitle>
                <input placeholder={''} value={title}
                    className={'questionnaireNameInput'}
                    onChange={(Event) => setQuestionnaireTitle(Event.target.value)} />
            </QuestionnaireTitle>

        </TimingSection>
        <TimingSection className={'statusSection'}>
            <p className={'regular-title'}>وضعیت پرسشنامه</p>
            
<StatusQuestionnaire active={activeOrNot}>
    <button onClick={()=>{setQuestionnaireActive(true)}} className="active">
        <p>فعال</p>
    </button>
    <button onClick={()=>{setQuestionnaireActive(false)}}  className="unactive">
        <p>غیرفعال</p>
    </button>
</StatusQuestionnaire>
        </TimingSection>

    </QuestionnaireTimingContainer>
    <CommunityStatus>

        {/* <TargetCommunityCheckbox onClick={() => {
            setIsLoginRequired(!isLoginRequired);
        }}>
            <Tick active={!isLoginRequired} />
            <p>پاسخگویی بدون ورود</p>
        </TargetCommunityCheckbox> */}
        
        <DisposableLink onClose={()=>chengeHandlerPopup()} statusPopup={popupLinkState} group_id={params.questionnaireID} data={DisposableLinkData?.results} status={true}></DisposableLink>
     <div className="space"></div>
    
        <Paginate activePage={1} pageSize={12} itemsCount={DisposableLinkData?.count || 0} setPage={(page)=>chengePage(page)}/>
    
    </CommunityStatus>
    <Version qroup_id={params.questionnaireID} addClick={()=>setOpen((p) => !p)} data={questionnaireData?.versions} setActiveVersion={(number:number)=>setActiveVersion(number)} activeVersion={activeVersion}/>
      <div className='btnMain'>

      <button onClick={()=>PatchHandler()} className='BTNsave'>
      {loadingSave?
   <SpinnerLoading color={'white'} width={20} height={20}/>:<p>
        ذخیره
        </p>}
        </button>
      </div>
    </ContainerQuestionnairePage>
  )
}

export default Page
const ContainerQuestionnairePage = styled.div`
display: flex;
flex-direction: column;
padding: 0 32px;
gap: 16px;
@media screen and (max-width:800px) {
padding: 0 16px;

}

.statusSection{
    
width: clamp(200px,23%,400px);
}
.titleSection{
    min-width: 300px;
}
.btnMain{
    display: flex;
    justify-content: flex-end;
    padding-bottom: 32px;

}
.BTNsave{
    cursor: pointer;
display: flex;
padding: 8px 64px;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 4px;
background: var(--Main, #2979FF);
p{
    color: #fff;
}
}
.space{
    height: 8px;
}
`
const CommunityStatus = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start ;



`

const StatusQuestionnaire = styled.div<{active:boolean}>`
width: 100%;
display: flex;
background-color: #FFFFFF;
height: 53px;
border-radius: 8px;
border: 1px solid var(--Gray-E, #EEE);
overflow: hidden;
p{
    font-size: 16px;
    font-weight: 500;
}
.active{
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 500ms;
    background-color: ${p=>p.active?'#2979ff':'#ffffff'};
    p{
        color: ${p=>p.active?'#fff':'#333'};
    }
}
.unactive{
    transition: background 500ms;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    background-color: ${p=>!p.active?'#2979ff':'#ffffff'};
    color: ${p=>!p.active?'#fff':'#333'};

    justify-content: center;
}

`