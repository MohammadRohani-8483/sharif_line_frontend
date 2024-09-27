import React, {useState} from "react";
import {LayoutSidebar} from "./LayoutSidebar";
import {
    LayoutContainer, LayoutMainBody,
    LayoutMainContainer,
} from "@/src/styles/common/layout";
import {LayoutMainHeaderComponent} from "@/src/components/common/LayoutComponents/LayoutMainHeader";
import {RootAuthorization} from "@/src/components/common/LayoutComponents/RootAuth";

export const RootLayout = ({ children , pathname } : { children : React.ReactNode , pathname : string }) => {
    const [ sideBarOpen , setSideBarOpen ] = useState<boolean>(false);

    return <LayoutContainer>
        <LayoutSidebar sideBarOpen={sideBarOpen} />
        <LayoutMainContainer resultspage={pathname.includes('statistics')}  sidebaropen={sideBarOpen}>
            <LayoutMainHeaderComponent sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
            <LayoutMainBody id="scroll">
                {children}
            </LayoutMainBody>
        </LayoutMainContainer>
    </LayoutContainer>
}