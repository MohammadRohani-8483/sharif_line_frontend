import {HeaderSearchBar} from "./HeaderSearchBar";
import React from "react";
import {
    HeaderToggleButton,
    LayoutHeaderTopPart,
    LayoutMainHeader, LayoutUserNameContainer, SideBarMask,
    SideBarToggleButton
} from "@/src/styles/common/layout";
import {defaultIconURL, Icon} from "@/src/styles/common/icon";
import {T_SetState} from "@/src/utils/types/global";
import Schema from "Schema";
import { usePathname } from "next/navigation";
import { useSelector } from "@/src/utils/store";

type LayoutMainHeaderProp = { sideBarOpen : boolean , setSideBarOpen : T_SetState<boolean> }

export const LayoutMainHeaderComponent = ({ setSideBarOpen , sideBarOpen } : LayoutMainHeaderProp) => {
    const UserData : Schema.Profile|null = useSelector(S => S.base.user);
    const pathname = usePathname()
    if(pathname.includes('/answer')) return <></>
    if(pathname.includes('/payment')) return <></>
    return <LayoutMainHeader id='headerbar'>
        <SideBarMask $sidebaropen={sideBarOpen} onClick={() => setSideBarOpen(false)} />
        <LayoutHeaderTopPart>
            <HeaderToggleButton onClick={() => setSideBarOpen(true)}>
                <Icon name={'menu'} width={24} height={24} />
            </HeaderToggleButton>
            <LayoutUserNameContainer>
            <span>
                <Icon name={'UserRounded'} width={24} height={24} />
            </span>
                <p>{UserData?.first_name} {UserData?.last_name}</p>
            </LayoutUserNameContainer>
        </LayoutHeaderTopPart>
        <HeaderSearchBar />
        <SideBarToggleButton sidebaropen={sideBarOpen} >
            <Icon className={'CurveSVG'} name={'Frame48095875'} url={`${defaultIconURL}sideBarSVGs/`}/>
            <span onClick={() => setSideBarOpen(!sideBarOpen)}>
               <Icon
                     className={'toggleSideBarIcon'}
                     url={`${defaultIconURL}sideBarSVGs/`} width={40} height={40} name={'sidebar_arrow'} />
            </span>
        </SideBarToggleButton>
        <LayoutUserNameContainer className={'mobile'}>
            <span>
                <Icon name={'UserRounded'} width={24} height={24} />
            </span>
            <p>{UserData?.first_name} {UserData?.last_name}</p>
        </LayoutUserNameContainer>
    </LayoutMainHeader>
}