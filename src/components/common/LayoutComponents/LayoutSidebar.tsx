import {
    SideBarElement,
    SideBarItemContainer,
    SideBarItemInnerContainer,
    SideBarContainer,
    SideBarHead,
    SideBarCloseItems,
    SideBarHomeItem,
    SideBarBody
} from "@/src/styles/common/layout";
import {MenuItems} from "@/src/utils/staticData/menu";
import {defaultIconURL, Icon} from "@/src/styles/common/icon";
import Link from "next/link";
import React, {useContext} from "react";
import {ReactSVG} from "react-svg";
import {usePathname} from "next/navigation";
import {ModalContext} from "@/src/utils/contexts/ModalContext";
import {LogoutPopup} from "@/src/components/common/LayoutComponents/LogoutPopup";

export const LayoutSidebar = ({sideBarOpen}: {
    sideBarOpen: boolean,
}) => {
    const modalContext = useContext(ModalContext);

    const setModalProps = () => {
        if (modalContext)
            modalContext.setModalProp({
                modalBody: <LogoutPopup title={'خروج از حساب کاربری'}
                                        confirmText={'خروج'}
                                        loading={false}
                                        onOkay={() => {
                                        }}
                                        closeModal={modalContext.closeModal}/>,
                hideHeader: true,
                wrapperStyles: {width: 370, borderRadius: 8}
            })
    }
    const pathname = usePathname()
    if(pathname.includes('/answer')) return <></>
    if(pathname.includes('/payment')) return <></>
    return <SideBarElement id="sidebar" sidebaropen={sideBarOpen}>
        <SideBarContainer>
            <SideBarHead sidebaropen={sideBarOpen}>
                <SideBarCloseItems $sidebaropen={sideBarOpen}>
                    <Icon url={`${defaultIconURL}sideBarSVGs/`} name={'CsideBarTitle'}
                          width={59} height={52} className={'closedSideBarIcon'} style={{marginRight:16}}/>
                    <SideBarHomeItem>
                        <Icon url={`${defaultIconURL}sideBarSVGs/`} name={'home'} width={24} height={24}/>
                    </SideBarHomeItem>
                </SideBarCloseItems>
                <Icon url={`${defaultIconURL}sideBarSVGs/`} name={'OsideBarTitle'}
                      width={117} height={102} className={'openSideBarIcon'}/>
                {/*<Icon className={'shit'} name={'Frame48095875'} url={`${defaultIconURL}sideBarSVGs/`}/>*/}
            </SideBarHead>
            <SideBarBody sidebaropen={sideBarOpen}>
                <div className={'SidebarBodyBox'}>
                    {
                        MenuItems.map((SideBarItem, index: number) => <Link href={SideBarItem.url} key={index}>
                            <SideBarItemContainer>
                                <SideBarItemInnerContainer sidebaropen={sideBarOpen}
                                                           active={pathname === SideBarItem.url}>
                                    <ReactSVG src={`${defaultIconURL}sideBarSVGs/${SideBarItem.icon}.svg`}/>
                                    <p>{SideBarItem.title}</p>
                                </SideBarItemInnerContainer>
                            </SideBarItemContainer>
                        </Link>)
                    }
                </div>
                <div className={'SidebarBodyBox'}>
                    <SideBarItemContainer>
                        <SideBarItemInnerContainer logout={'active'} sidebaropen={sideBarOpen} onClick={() => {
                            setModalProps();
                            if (modalContext)
                                modalContext.openModal();
                        }}>
                            <Icon name={'Logout'} width={24} url={`${defaultIconURL}sideBarSVGs/`} height={24}/>
                            <p>خروج از حساب کاربری</p>
                        </SideBarItemInnerContainer>
                    </SideBarItemContainer>
                </div>
            </SideBarBody>
        </SideBarContainer>
    </SideBarElement>
}