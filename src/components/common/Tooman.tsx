'use client'
import { ReactSVG } from 'react-svg'
import styled from 'styled-components'

type Type = 'base' | 'square_bold' | 'square_light'
type Props = { type: Type, color: string, width: number }
type StyledProps = { $type: Type, $color: string, $width: number }

export default function Tooman({ type, color, width }: Props) {
  return (
    <Container $width={width} $type={type} $color={color}>
      <ReactSVG src={`/images/svg/tooman/tooman_${type}.svg`} width={20} height={20} />
    </Container>
  )
}

const Container = styled.div<StyledProps>`
    width: ${p => p.$width}px;
    height: ${p => p.$type !== 'base' ? p.$width : p.$width * 19 / 28}px;
  div{
    width: ${p => p.$width}px;
    height: ${p => p.$type !== 'base' ? p.$width : p.$width * 19 / 28}px;
    svg{
      width: ${p => p.$width}px;
      height: ${p => p.$type !== 'base' ? p.$width : p.$width * 19 / 28}px;
      path{
        fill: ${p => p.$color};
      }
    }
  }
`