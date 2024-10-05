import { Container, Item, LinkItem } from "@/src/styles/components/popupMenu";
import { errorHandler } from "@/src/utils/functions/errorHandler";
import { closePopup } from "@/src/utils/functions/global";
import { isOpen, T_SetState } from "@/src/utils/types/global";
import { T_QuestionnaireList } from "@/src/utils/types/pages/questionnaire";
import { axiosInstance } from '@/src/utils/helper/axios'
import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Icon } from "@/src/styles/common/icon";
import { ModalContext } from "@/src/utils/contexts/ModalContext";
import { LogoutPopup } from "@/src/components/common/LayoutComponents/LogoutPopup";

type Props = {
    open: isOpen
    questionnaire: T_QuestionnaireList
    setOpen: T_SetState<isOpen>
    setFlag: () => void
}

const PopupMenu = ({ open, questionnaire, setFlag, setOpen }: Props) => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

    const modalContext = useContext(ModalContext);

    const setModalProps = () => {
        if (modalContext) {
            modalContext.openModal();
            modalContext.setModalProp({
                modalBody:
                    <LogoutPopup title={'آیا مطمئن هستید؟'}
                        confirmText={'حذف'}
                        loading={false}
                        onOkay={() => deleteQuestionnaore(modalContext.closeModal)}
                        closeModal={modalContext.closeModal}
                    />,
                hideHeader: true,
                wrapperStyles: { width: 370, borderRadius: 8 }
            })
            closePopup(setOpen)
        }
    }

    const deleteQuestionnaore = (close: () => void) => {
        axiosInstance().delete(`question/group-questionnaire/${questionnaire.group_id}/questionnaire/${questionnaire.id}/`)
            .then(() => {
                toast.success('پرسشنامه با موفقیت حذف شد')
                setFlag()
                close()
            })
            .catch((err) => {
                errorHandler(err.response);
            })
        fetch('/api/question/group')
    }

    const handleClickActiveQuestionnaire = (isActive: boolean) => {
        axiosInstance().patch(`question/group-questionnaire/${questionnaire.group_id}/`, { is_active: !isActive })
            .then(() => {
                toast.success(isActive ? 'پرسشنامه با موفقیت غیرفعال شد' : 'پرسشنامه با موفقیت فعال شد')
                setFlag()
                closePopup(setOpen)
            })
            .catch((err) => {
                errorHandler(err.response);
            })
    }

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: any) => {
        if (!ref.current?.contains(e.target)) closePopup(setOpen)
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <Container
            ref={ref}
            initial={{ opacity: 0 }}
            animate={open.visible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <LinkItem href={`/${questionnaire.id}/statistics?group_id=${questionnaire.group_id}&result_stage=true`} >
                <Icon name="document_text" width={24} height={24} />
                <p>نتایج</p>
            </LinkItem>
            <LinkItem href='/form'>
                <Icon name="edit" width={24} height={24} />
                <p>ویرایش</p>
            </LinkItem>
            <Item onClick={() => {
                navigator?.clipboard.writeText(`${origin}/${questionnaire.group_slug}/answer`)
                toast.success('لینک پرسشنامه با موفقیت کپی شد')
                closePopup(setOpen)
            }}
            >
                <Icon name="share" width={24} height={24} />
                <p>اشتراک گذاری</p>
            </Item>
            <Item
                onClick={() => handleClickActiveQuestionnaire(questionnaire.is_active)}
            >
                <Icon name={questionnaire.is_active ? "eye_closed" : "eye"} width={24} height={24} />
                <p>
                    {questionnaire.is_active ? 'غیر فعال کردن' : "فعال کردن"}
                </p>
            </Item>
            <Item red
                onClick={setModalProps}
            >
                <Icon name="trash_red" width={24} height={24} />
                <p>حذف</p>
            </Item>
        </Container>
    )
}

export default PopupMenu