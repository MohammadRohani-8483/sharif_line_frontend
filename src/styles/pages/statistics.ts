import styled from 'styled-components'

export const TitleStatge = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;

  section{
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
  }

  @media (min-width: ${p => p.theme.breakpoints.md}) {
    flex-direction: row;
    section{
      justify-content: center;
      width: auto;
    }
  }

  .title{
    font-size: 16px;
    font-weight: 500;
    color: ${p => p.theme.colors.neutral[3]};
    white-space: nowrap;
  }

  .line{
    width: 100%;
    padding-block: 0.5px;
    background-color: ${p => p.theme.colors.neutral.e};
    border-radius: 2px;
  }

  .modes{
    @media (max-width: ${p => p.theme.breakpoints.sm}){
      display: none;
    }
  }
`