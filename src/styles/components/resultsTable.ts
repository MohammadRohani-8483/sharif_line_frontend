import styled, { css } from 'styled-components'

export const TableCont = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  border: 1px solid ${p => p.theme.colors.neutral.e};
  background-color: white;
  border-radius: 8px;
  color: ${p => p.theme.colors.neutral[3]};
  font-weight: 500;
  font-size: 16px;
`

export const Table = styled.table<{ no_success: boolean, sort: 'created_at' | '-created_at' | '' }>`
  flex: 1;
  border-collapse: collapse;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: ${p => p.theme.colors.neutral[3]};
  ${p => p.no_success && css`
    margin: auto;
  `}

  tr:not(:last-child){
    border-bottom: 1px solid ${p => p.theme.colors.neutral.e};
  }

  tr:nth-child(odd):not(:first-child){
    background-color: ${p => p.theme.colors.neutral.fa};
  }

  td {
    height: 60px;
    min-width: 130px;
    max-width: 300px;
    user-select: text;
    border-left: 1px solid ${p => p.theme.colors.neutral.e};
  }

  .indexCount{
    min-width: 50px;
  }

  section{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
  }

  .sort{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: ${p => p.sort === '' ? "#333" : 'var(--Main)'};

    &:before{
      content: '';
      background: url(/images/svg/${p => p.sort === 'created_at' ? 'sort_top_to_bottom' : 'sort_bottom_to_top'}.svg);
      width: ${p => p.sort !== '' ? '24px' : 0};
      height: 24px;
    }
  }
`;

export const ChildrenTd = styled.td`
  max-width: 150px !important;
`

export const ItemTr = styled.tr<{ active?: boolean }>`
  i{
    margin: auto;
  }

  .tick{
    div{
      margin: auto;
    }
  }

  .index{
    min-width: 45px;
  }

  ${p => p.active && css`
  background-color: ${p.theme.colors.mainBack.main} !important;
  `}

  .date{
    line-height: 165%;
  }
`

export const Paragraph = styled.p<{ childs?: number, ischild?: boolean }>`
  width: ${p => p.childs ? (p.childs * 150) : p.ischild ? 150 : 300}px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-inline: 4px;
  text-align: center;
  margin: auto;
  position: relative;
  cursor: pointer;
`