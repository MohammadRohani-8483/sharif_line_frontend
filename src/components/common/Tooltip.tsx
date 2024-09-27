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
                              return <TooltipBody placement={placement ? placement : 'bottom'} className={'tooltip-body'}>
                                  <Icon className={'tooltip-svg'} name={'tooltip-svg'} width={80} height={80}/>
                                  <div className={'tooltip-content'}>{title}</div>
                              </TooltipBody>
                          }}
            // children={<TooltipBody placement={placement}>
            //     <Icon name={'tooltip-svg'} width={80} height={80} />
            //     <div className={'tooltip-content'}>{title}</div>
            // </TooltipBody>}
                          style={{background: 'none' , zIndex : 999999}}
                          place={placement} noArrow={true}
        />
        {children}
    </>
}


const TooltipBody = styled.div<{ placement: PlacesType }>`
  //--rt-opacity : 1 !important;
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
      // top: ${p => (p.placement === 'right' || p.placement === 'left') ? '50%' : '-15px'};
      // left: ${p => p.placement === 'right' ? '-35px' : p.placement === 'left' ? 'unset' : '50%'};
      // right: ${p => p.placement === 'left' ? '-35px' : 'unset'};
      // transform: ${p => p.placement === 'right' || p.placement === 'left' ? 'translateY(-50%) rotate(-90deg)' : 'translateX(-50%)'};
    // z-index: 1;
      // height: ${p => p.placement === 'right' || p.placement === 'left' ? '30px' : '40px'};
  }

  & .tooltip-content {
    position: relative;
    z-index: 2;
  }
`
// transform: translateY(-50%) rotate(-90deg);
// top: 50%;
// left: -35px;
// height: 30px;

