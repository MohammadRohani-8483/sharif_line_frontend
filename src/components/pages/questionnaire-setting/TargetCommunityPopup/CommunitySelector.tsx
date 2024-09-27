import {
    AddConditionBox,
    SelectedCommunicationsContainer
} from "@/src/styles/pages/questionnaire-setting";
import {Icon} from "@/src/styles/common/icon";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {I_ApiCommunicationResponse, I_Communication} from "@/src/utils/types/pages/questionnaireSetting";
import {axiosInstance} from "@/src/utils/helper/axios";
import ENDPOINTS from "@/src/utils/jsons/endpoints.json";
import {useEffect, useState} from "react";
import {TargetFieldPopover} from "@/src/components/pages/questionnaire-setting/TargetCommunityPopup/TargetFieldPopover";
import {
    AddConditionButton, SelectedCommunicationItem
} from "@/src/styles/pages/questionnaire-setting/targets-popup";

export const CommunitySelector = ({targetCommunications, updateCommunicationsData}: {
    targetCommunications: I_Communication[],
    updateCommunicationsData: (List: I_Communication[], Item: I_Communication) => void
}) => {
    const [majorsSearchValue, setMajorsSearchValue] = useState<string>('');
    const CommunicationQuery: UseQueryResult<AxiosResponse<I_ApiCommunicationResponse>> = useQuery({
        queryKey: ['CommunicationQuery'],
        queryFn: async () => await axiosInstance().get(ENDPOINTS.COMMUNICATION + `${majorsSearchValue ? `?search=${majorsSearchValue}` : ''}`),
        enabled : false
    })
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    useEffect(() => {
        CommunicationQuery.refetch();
    }, [majorsSearchValue]);

    return CommunicationQuery.data?.data && <AddConditionBox>
        <p className={'title'}>جامعه</p>
        <SelectedCommunicationsContainer>
            {
                targetCommunications.length ?
                    targetCommunications.map((Item) =>
                        <SelectedCommunicationItem key={Item.id}>
                            <p>{Item.title}</p>
                            <Icon name={'close'} height={14}
                                  onClick={() => updateCommunicationsData(targetCommunications, Item)}/>
                        </SelectedCommunicationItem>) : ''
            }
            <AddConditionButton onClick={() => setPopoverOpen(!popoverOpen)}>
                <Icon name={'plus'} style={{transform: popoverOpen ? 'rotate(45deg)' : 'none'}} width={15} height={15}/>
            </AddConditionButton>
        </SelectedCommunicationsContainer>

        <TargetFieldPopover
            setPopoverOpen={setPopoverOpen}
            searchLoading={CommunicationQuery.isRefetching}
            popoverOpen={popoverOpen}
            updateListData={updateCommunicationsData}
            listData={targetCommunications}
            availableList={CommunicationQuery.data.data.results}
            setMajorsSearchValue={setMajorsSearchValue}
            // majorsSearchValue={majorsSearchValue}
        />
    </AddConditionBox>
}

