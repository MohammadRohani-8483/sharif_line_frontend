import styled from "styled-components";

export const TickLoading = styled.span<{ width? : number , height? : number }>`
  width: ${p => p.width ? p.width + 'px' : '15px'};
  height: ${p => p.height ? p.height + 'px' : '15px'};
  background: var(--grey-e);
  border-radius: 4px;
`
export const LoadingText = styled.p<{ fontSize? : number }>`
  background: var(--grey-e) !important;
  color: var(--grey-e) !important;
  font-size: ${p => p.fontSize ? p.fontSize + 'px' : '14px'};
`

export const LoadingIcon = styled.i<{ width? : number , height? : number , background? : string }>`
  width: ${p => p.width ? p.width + 'px' : '16px'};
  height: ${p => p.height ? p.height + 'px' : '16px'};
  background: ${p => p.background ? p.background : 'var(--grey-e)'};
  border-radius: 4px;
`