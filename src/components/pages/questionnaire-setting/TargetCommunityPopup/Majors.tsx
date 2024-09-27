import styled from "styled-components";
import {I_ApiCommunicationResponse, I_Communication, I_Condition} from "@/src/utils/types/pages/questionnaireSetting";
import {Icon} from "@/src/styles/common/icon";
import Tick from "@/src/components/common/Tick";
import {T_SetState} from "@/src/utils/types/global";
import {TargetFieldPopover} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/TargetFieldPopover";
import {useEffect, useState} from "react";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {axiosInstance} from "@/src/utils/helper/axios";
import ENDPOINTS from "@/src/utils/jsons/endpoints.json";
import {Accordion} from "@/src/components/common/Accordion";
import {
    AddConditionButton,
    ConditionCBInnerContainer, ConditionCheckBoxSection,
    ConditionCheckboxTitle
} from "@/src/styles/pages/questionnaire-setting/targets-popup";

type MajorsSectionProp = {
    majorCheckBox: boolean, targetMajor: I_Communication[],
    setTargetData: T_SetState<Omit<I_Condition, 'id'>>,
    setMajorCheckbox: T_SetState<boolean>,
    updateMajorsList: (List: I_Communication[], Item: I_Communication) => void
}

export const MajorsSection = ({
                                  majorCheckBox,
                                  targetMajor,
                                  setTargetData,
                                  setMajorCheckbox,
                                  updateMajorsList
                              }: MajorsSectionProp) => {

    const [majorsSearchValue, setMajorsSearchValue] = useState<string>('');
    const MajorsQuery: UseQueryResult<AxiosResponse<I_ApiCommunicationResponse>> = useQuery({
        queryKey: ['MajorsQuery'],
        queryFn: async () => await axiosInstance().get(ENDPOINTS.MAJORS + `${majorsSearchValue ? `?search=${majorsSearchValue}` : ''}`),
        enabled : false ,
    })
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    useEffect(() => {
        MajorsQuery.refetch();
    }, [majorsSearchValue]);
    return MajorsQuery.data?.data &&
        <ConditionCheckBoxSection open={majorCheckBox} style={{padding: 0}} targetHeight={'auto'}>
            <ConditionCBInnerContainer>
                <ConditionCheckboxTitle onClick={() => {
                    if (majorCheckBox)
                        setTargetData(prevState => ({...prevState, major: null}))
                    setMajorCheckbox(!majorCheckBox);
                    setPopoverOpen(false);
                }}>
                    <Tick active={majorCheckBox} />
                    <p>رشته تحصیلی</p>
                </ConditionCheckboxTitle>
                <AddConditionButton background={'white'} disabled={!majorCheckBox} onClick={() => setPopoverOpen(!popoverOpen)}>
                    <Icon name={'plus'} style={{ transform: popoverOpen ? 'rotate(45deg)' : 'none' , opacity : majorCheckBox ? 1 : 0.6}}
                          width={15} height={15}/>
                </AddConditionButton>
                <TargetFieldPopover
                                    setPopoverOpen={setPopoverOpen}
                                    searchLoading={MajorsQuery.isRefetching}
                                    popoverOpen={popoverOpen}
                                    updateListData={updateMajorsList}
                                    listData={targetMajor ? targetMajor as I_Communication[] : []}
                                    availableList={MajorsQuery.data.data.results}
                                    setMajorsSearchValue={setMajorsSearchValue}
                                    // majorsSearchValue={majorsSearchValue}
                />
            </ConditionCBInnerContainer>
            <Accordion accordionOpen={!!(majorCheckBox && targetMajor?.length)} childID={'majorsSelector'}>
                <MajorsSelector updateMajorsList={updateMajorsList}
                                majorsList={targetMajor ? targetMajor as I_Communication[] : []}/>
            </Accordion>
        </ConditionCheckBoxSection>
}

export const MajorsSelector = ({majorsList , updateMajorsList }:
   { majorsList: I_Communication[] , updateMajorsList : (List: I_Communication[], Item: I_Communication) => void }) => {
    return <MajorsContainer id={'majorsSelector'}>
        {
            majorsList.length ? majorsList.map((Item) => <MajorItem key={Item.id}>
                <p>{Item.title}</p>
                <Icon name={'close'} onClick={() => updateMajorsList(majorsList,Item)}/>
            </MajorItem>) : ''
        }
    </MajorsContainer>
}

const MajorsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`
const MajorItem = styled.div`
  display: flex;
  padding: 12px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--grey-e);
  background: var(--gray-fa);
  font-weight: 400;
  font-size: 1.6rem;
  gap: 6px;
  color: var(--sidebar-bg);
  
  & i {
    width: 0;
    transform: rotate(45deg);
    transition: 0.3s;
    cursor: pointer;
  }

  &:hover i {
    width: 14px;
    transform: none;
  }
`