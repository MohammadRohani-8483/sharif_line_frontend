'use client'


import { Style, TailSpin } from "react-loader-spinner";
import { CSSProperties } from "react";
import styled from "styled-components";

type SpinnerLoadingProp = {
    width?: number,
    height?: number,
    color: string,
    wrapperStyle?: Style
}

export const SpinnerLoading = (props: SpinnerLoadingProp) => {
    // return <TailSpin
    //     visible={true}
    //     height={props.height ? props.height : 50}
    //     width={props.width ? props.width : 50}
    //     color={props.color}
    //     ariaLabel="tail-spin-loading"
    //     radius="1"
    //     wrapperStyle={props.wrapperStyle ? props.wrapperStyle : {}}
    //     wrapperClass=""
    // />
    return <Spinner size={props.width || props.height} color={props.color} />
}

const Spinner = styled.div<{ size?: number }>`
    @keyframes spin {
    from {
        transform: rotate(0)
    }

    to {
        transform: rotate(360deg)
    }
    }
    width: ${p => p.size || 50}px;
    height: ${p => p.size || 50}px;
    border: 3px solid ${p => p.color};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-radius: 50%;
    animation: spin 1s infinite linear;
`