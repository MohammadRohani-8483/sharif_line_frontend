import {Icon} from "@/src/styles/common/icon";
import {T_SetState} from "@/src/utils/types/global";
import {I_Communication, I_Condition} from "@/src/utils/types/pages/questionnaireSetting";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {axiosInstance} from "@/src/utils/helper/axios";
import {LogoutPopup} from "@/src/components/common/LayoutComponents/LogoutPopup";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {ModalContext} from "@/src/utils/contexts/ModalContext";
import {queryClient} from "@/src/app/client";
import {errorHandler} from "@/src/utils/functions/errorHandler";
import {useSearchParams} from "next/navigation";
import {AddConditionButton} from "@/src/styles/pages/questionnaire-setting/targets-popup";
import {TargetItemContainer} from "@/src/styles/pages/questionnaire-setting/page";

export const TargetComponent = ({ targetData , setAddTargetModalProp ,setEditConditionID , questionnaireID , selectedConditions , setSelectedConditions , setDisableEditOrAdd , openModal , setTargetData , setCreateMode } :
    { targetData : I_Communication, setAddTargetModalProp : () => void , openModal  : () => void , setTargetData : () => void ,
        setSelectedConditions : T_SetState<I_Condition[]> , selectedConditions : I_Condition[] , questionnaireID : string ,
        setCreateMode : T_SetState<boolean> , setDisableEditOrAdd : T_SetState<boolean>
    setEditConditionID : T_SetState<number | null> }) => {
    const searchParams = useSearchParams();
    const modalContext = useContext(ModalContext);
    const [ targetsList , setTargetsList ] = useState<I_Condition[]>([]);
    const deleteCondition = useMutation({
        mutationFn : async () => {
            await axiosInstance().patch(`/question/group-questionnaire/${searchParams.get('group_id')}/questionnaire/${questionnaireID}`,{
                conditions : targetsList.map((ConditionItem) => ConditionItem.id),
                is_required_login : true
            })
            await queryClient.invalidateQueries({ queryKey : ['QSSettingQuery'] });
        },
        onSuccess : () => {
            toast.success('با موفقیت حذف شد');
            if(modalContext)
                modalContext.closeModal();
            setSelectedConditions((prevState) => {
                return prevState.filter((Item) => Item.id !== targetData.id);
            })
        },
    })
    useEffect(() => {
        setTargetsList(selectedConditions);
    }, [selectedConditions]);
    const setModalProp = (Loading : boolean) => {
        if(modalContext)
            modalContext.setModalProp({
                modalBody : <LogoutPopup  title={'آیا مطمئن هستید؟'}
                                          confirmText={'حذف'}
                                          loading={Loading}
                                          onOkay={deleteQuestionnaireHandler}
                                          closeModal={modalContext.closeModal} /> ,
                hideHeader : true ,
                wrapperStyles : { width : 370 , borderRadius : 8 }
            })
    }
    const deleteQuestionnaireHandler = async () => {
        setTargetsList((prevState) => {
            return prevState.filter((Item) => Item.id !== targetData.id);
        })
        setModalProp(true);
        deleteCondition.mutate();
    }
    return <TargetItemContainer>
        <p>{targetData.title}</p>
        <div className={'target-buttons'}>
            <AddConditionButton onClick={() => {
                setDisableEditOrAdd(false);
                if(modalContext) {
                    setTimeout(() => {
                        modalContext.setModalProp({});
                        setModalProp(false);
                        openModal();
                    },60)
                }

            }} bordercolor={'#FCC8C8'} background={'rgba(255, 0, 0, 0.08)'}>
                <Icon name={'TrashBinMinimalistic'} width={24} height={24} />
            </AddConditionButton>
            <AddConditionButton onClick={() => {
                setAddTargetModalProp();
                setCreateMode(true)
                setEditConditionID(targetData.id);
                setTargetData();
                openModal();
            }} bordercolor={'#CCC'} background={'#EEE'}>
                <Icon name={'pen'} width={24} height={24} />
            </AddConditionButton>
        </div>
    </TargetItemContainer>
}