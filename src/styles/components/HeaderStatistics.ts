import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (min-width: ${p=>p.theme.breakpoints.xl}){
    flex-direction: row;
    justify-content: space-between;
  }
`

export const TitleAndButtons = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${p => p.theme.colors.neutral.e};

  @media (min-width: ${p => p.theme.breakpoints.sm}){
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
`

export const Title = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;

  p{
    color: ${p => p.theme.colors.neutral[6]};
    font-size: 12px;
    font-weight: 300;
  }

  h1{
    color: ${p => p.theme.colors.neutral[3]};
    font-size: 18px;
    font-weight: 700;
  }
`

export const Buttons = styled.div`
  width: 100%;
  height: 76px;
  border-top: 1px solid ${p => p.theme.colors.neutral.e};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  section,a{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
    padding: 10px 0;
  }

  section:hover,a:hover{
    background-color: ${p => p.theme.colors.neutral.hover};
  }

  section:not(:first-child),a:not(:first-child){
    border-right: 1px solid ${p => p.theme.colors.neutral.e};
  }

  @media (min-width: ${p => p.theme.breakpoints.sm}){
    border-top: none;
    width: 375px;

    section,a{
      height: 100%;
    }

    section:first-child,a:first-child{
      border-right: 1px solid ${p => p.theme.colors.neutral.e};
    }
  }
`

export const ExportBtn = styled.div`
    cursor: pointer;
    background-color: white;
    width: 100%;
    height: 76px;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid ${p => p.theme.colors.neutral.e};
    
    &:hover{
        background-color: ${p => p.theme.colors.neutral.hover};
    }
    
    p{
        font-size: 16px;
        font-weight: 500;
        color: ${p => p.theme.colors.main};
        white-space: nowrap;
    }

    @media (min-width: ${p=>p.theme.breakpoints.xl}){
        width: auto;
        padding: 8px 24px;
    }
`