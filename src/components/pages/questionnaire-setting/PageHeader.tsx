import {Icon} from "@/src/styles/common/icon";
import React, {useContext} from "react";
import {ModalContext} from "@/src/utils/contexts/ModalContext";
import {LogoutPopup} from "@/src/components/common/LayoutComponents/LogoutPopup";
import {useMutation} from "@tanstack/react-query";
import {axiosInstance} from "@/src/utils/helper/axios";
import {toast} from "react-toastify";
import {Tooltip} from "@/src/components/common/Tooltip";
import {
    PageHeader,
    PageHeaderButton,
    PageHeaderButtons,
    PageHeaderTitle
} from "@/src/styles/pages/questionnaire-setting/page";
import Link from "next/link";

type T_QuestionnaireHeader = {
    questionnaireGroupID : string ,
    questionnaireID : string ,
    title : string ,
    isActive : boolean ,
    setIsActive : () => void
}

export const QuestionnaireSettingPageHeader = (props :T_QuestionnaireHeader) => {
    const modalContext = useContext(ModalContext);
    const deleteQuestionnaireQuery = useMutation({
        mutationFn : async () =>
            await axiosInstance().delete(`question/group-questionnaire/${props.questionnaireGroupID}/questionnaire/${props.questionnaireID}`)
    })
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
        if(modalContext)
            setModalProp(true);
        await deleteQuestionnaireQuery.mutate();
        toast.success('با موفقیت حذف شد');
        if(modalContext) {
            setTimeout(async () => {
                modalContext.closeModal()
                // Get the current URL
                let currentUrl = new URL(window.location.href);
                let params = currentUrl.searchParams;
                params.delete('group_id');
                currentUrl.search = params.toString();
                window.history.replaceState({}, '', currentUrl.toString());
                window.location.pathname = '/'
            },300);
        }
    }

    return <PageHeader>
        <PageHeaderTitle>
            <p>موضوع پرسشنامه</p>
            <h2>{props.title}</h2>
        </PageHeaderTitle>
        <PageHeaderButtons>
            <Link href={'/form'}>
                <Tooltip title={'ویرایش پرسشنامه'} anchorClassName={'edit-button-anchor'} placement={'bottom'}>
                    <PageHeaderButton className={'edit-button-anchor'}>
                        <Icon name={'pen'} width={24} height={24} />
                    </PageHeaderButton>
                </Tooltip>
            </Link>
            <Link href={`/${props.questionnaireID}/answer`}>
                <Tooltip title={'مشاهده'} placement={'bottom'} anchorClassName={'activate-button-anchor'}>
                    <PageHeaderButton  className={'activate-button-anchor'}>
                        <Icon name={props.isActive ? 'eye' : 'eye_closed'} width={24} height={24} />
                    </PageHeaderButton>
                </Tooltip>
            </Link>
            <Tooltip title={'حذف پرسشنامه'} anchorClassName={'delete-button-anchor'} placement={'bottom'}>
                <PageHeaderButton className={'deleteButton delete-button-anchor'} onClick={() => {
                    if(modalContext) {
                        setModalProp(false);
                        modalContext.openModal();
                    }
                }}>
                    <Icon name={'trash_red'} width={24} height={24} />
                </PageHeaderButton>
            </Tooltip>
        </PageHeaderButtons>
    </PageHeader>
}