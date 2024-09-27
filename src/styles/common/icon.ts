'use client'
import styled from "styled-components";
export const defaultIconURL = "/images/svg/"
export const Icon = styled('i').withConfig({
    shouldForwardProp: (prop) =>
        !['name','width','height','url','fill'].includes(prop),
})<{ name : string , width? : number , height? : number,fill?: string,url?:string }>`
  background : url(${p=> p?.url ? p?.url : defaultIconURL }${p => p.name}.svg) no-repeat center;
  background-size : contain;
  width : ${p => p.width ?  p.width + 'px' : '18px' };
  height : ${p => p.height ? p.height + 'px' : '18px'};
  display : block;
  position: relative;
  fill: ${p=> p?.fill};
`
