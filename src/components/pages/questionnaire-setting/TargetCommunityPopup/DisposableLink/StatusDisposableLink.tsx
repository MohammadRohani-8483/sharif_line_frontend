import React from 'react'
import styled from 'styled-components'

function StatusDisposableLink(props:{status:"used" | "unused"}) {
  return (
    <StatusDisposableLinkMain status={props.status}>
      <div className="boxColor"></div>
      <p className='pStatusDisposable'>{props.status? 'استفاده نشده':"استفاده شده"}</p>
    </StatusDisposableLinkMain>
  )
}

export default StatusDisposableLink
const StatusDisposableLinkMain = styled.div<{status:"used" | "unused"}>`
display: flex;
gap: 8px;
.boxColor{
    width: 8px;
height: 15px;

border-radius: 8px;
background: ${p=>p.status=='used'?'#F00':'#2979FF'};
}
.pStatusDisposable{
    color: ${p=>p.status=='used'?'#F00':'#2979FF'} !important;
    text-wrap: nowrap;
}
`
