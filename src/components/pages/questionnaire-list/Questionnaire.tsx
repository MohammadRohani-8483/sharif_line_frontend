import { convertDate, formatNumber } from '@/src/utils/functions/global'
import { isOpen, T_Mode } from '@/src/utils/types/global'
import { T_QuestionnaireList } from '@/src/utils/types/pages/questionnaire'
import Link from 'next/link'
import React, { useState } from 'react'
import { Body, Buttons, Container, Footer, FootItem, HeadItem } from '@/src/styles/pages/questionnaire'
import PopupMenu from '../../popups/PopupMenu'
import { axiosInstance } from '@/src/utils/helper/axios'
import { errorHandler } from '@/src/utils/functions/errorHandler'
import { toast } from 'react-toastify'
import { Icon } from '@/src/styles/common/icon'
import { Tooltip } from "@/src/components/common/Tooltip";

const Questionnaire = ({ mode, data, setFlag, isArchive, setSearchNull }: { mode: T_Mode, data: T_QuestionnaireList, setFlag: () => void, isArchive?: boolean, setSearchNull?: () => void }) => {
    const [openPopup, setOpenPopup] = useState<isOpen>({ open: false, visible: false })

    const restoreQuestionnaire = () => {
        axiosInstance().post<{ message: string }>('question/archive/update_deleted_at/', { questionnaire_id: data.id })
            .then(res => {
                toast.success(res.data.message);
                setFlag()
            })
            .catch(err => errorHandler(err.response))
    }

    return (
        <>
            <Container isArchive={isArchive} mode={mode} className={'questionnaireContainer'}>
                <Body className={'questionnaireBody'} mode={mode}>
                    <HeadItem mode={mode} isArchive={isArchive}>
                        <div>
                            <p>موضوع پرسشنامه</p>
                            {!data.is_active && !isArchive && <h2>غیرفعال</h2>}
                        </div>
                        <h1 className='questionnaire_title'>
                            {data.title}
                        </h1>
                    </HeadItem>
                    <Footer mode={mode}>
                        {!isArchive &&
                            <FootItem mode={mode}>
                                <div>
                                    <Icon name='graph' width={22} height={22} />
                                    تعداد نتایج:
                                </div>
                                <p>
                                    {formatNumber(data.results_count)}
                                </p>
                            </FootItem>
                        }
                        <FootItem mode={mode}>
                            <div>
                                <Icon name='history' width={22} height={22} />
                                آخرین بروزرسانی:
                            </div>
                            <p>
                                {convertDate(data.created_at)}
                            </p>
                        </FootItem>
                        <FootItem mode={mode}>
                            <div>
                                <Icon name='calender' width={22} height={22} />
                                تاریخ ایجاد:
                            </div>
                            <p>
                                {convertDate(data.group_created_at)}
                            </p>
                        </FootItem>
                    </Footer>
                </Body>
                <Buttons mode={mode} className={'questionnaireFooterButtons'}>
                    {isArchive ?
                        <Tooltip title='بازگرداندن' anchorClassName={'restore-' + data.id} placement={'bottom'} >
                            <section onClick={restoreQuestionnaire} className={'restore-' + data.id}>
                                <Icon name='restart' width={24} height={24} />
                            </section>
                        </Tooltip>
                        :
                        <>
                            <Tooltip title={'نمودار'} anchorClassName={'chart-' + data.id} placement={'bottom'} >
                                <Link href={`/${data.id}/statistics?group_id=${data.group_id}`} className={'chart-' + data.id} onClick={setSearchNull}>
                                    <Icon name='chart' width={24} height={24} />
                                </Link>
                            </Tooltip>
                            <Tooltip title='مشاهده' anchorClassName={'eye-' + data.id} placement={'bottom'} >
                                <Link href={`/${data.group_slug}/answer`} className={'eye-' + data.id} onClick={setSearchNull}>
                                    <Icon name='eye' width={24} height={24} />
                                </Link>
                            </Tooltip>
                            <Tooltip title='تنظیمات' anchorClassName={'setting-' + data.id} placement={'bottom'} >
                                <Link href={`/${data.id}/setting?group_id=${data.group_id}`} className={'settingButton setting-' + data.id} onClick={setSearchNull}>
                                    <Icon name='settings' width={24} height={24} />
                                </Link>
                            </Tooltip>
                            <section className={'popoverButton'} onClick={() => setOpenPopup({ open: true, visible: true })}>
                                <Icon name='dots' width={24} height={24} />
                            </section>
                        </>
                    }
                </Buttons>
                {openPopup.open &&
                    <PopupMenu questionnaire={data} open={openPopup} setOpen={setOpenPopup} setFlag={setFlag} />
                }
            </Container>
        </>
    )
}

export default Questionnaire



