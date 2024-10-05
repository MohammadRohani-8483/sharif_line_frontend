'use client'
import {Tooltip as ToolTipComponent, PlacesType} from 'react-tooltip'
import React from "react";
import styled from "styled-components";
import {Icon} from "@/src/styles/common/icon";

type T_TooltipProp = {
    children: React.ReactNode,
    anchorClassName: string,
    placement?: PlacesType,
    title: string | React.ReactNode ,
    clickable? : boolean
}

export const Tooltip = ({children, anchorClassName, placement, title , clickable}: T_TooltipProp) => {

    return <>
        <ToolTipComponent anchorSelect={'.' + anchorClassName}
                          clickable={clickable}
                          render={() => {
                              return <TooltipBody className={'tooltip-body'}>
                                  <Icon className={'tooltip-svg'} name={'tooltip-svg'} width={80} height={80}/>
                                  <div className={'tooltip-content'}>{title}</div>
                              </TooltipBody>
                          }}
                          style={{background: 'none' , zIndex : 999999}}
                          place={placement} noArrow={true}
        />
        {children}
    </>
}


const TooltipBody = styled.div`
  min-height: 41px;
  min-width: 136px;
  max-width: 200px;
  word-break: break-word;
  text-align: center;
  position: relative;
  background: white;
  white-space: break-spaces;
  border-radius: 12px;
  filter: drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.25));
  color: var(--sidebar-bg);
  opacity: 1;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  padding: 8px 10px;
  > i {
    transition: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    top: -15px;
    height: 40px;
  }

  & .tooltip-content {
    position: relative;
    z-index: 2;
  }
`
