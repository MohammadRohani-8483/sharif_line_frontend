'use client'
import { useEffect } from 'react';
import styled from 'styled-components';
import { PageCont } from '../styles/common';
import { Icon } from '../styles/common/icon';
import theme from '../styles/theme';

export default function NotFound() {
  useEffect(() => {
    document.getElementById('sidebar')?.classList.add('hidden')
    document.getElementById('headerbar')?.classList.add('hidden')
    return () => {
      document.getElementById('sidebar')?.classList.remove('hidden')
      document.getElementById('headerbar')?.classList.remove('hidden')
    }
  }, [])

  return <NotFoundCont>
    <Icon name='logo-answer' width={194} height={82} style={{ margin: '40px auto' }} />
    <h1>404</h1>
    <p>چنین صفحه ای وجود ندارد.</p>
  </NotFoundCont>
}

const NotFoundCont = styled(PageCont)`
  align-items: center;
  justify-content: center;
  h1{
    color: ${theme.colors.main};
    font-size: 96px;
    font-weight: 900;
    margin-top: 150px;
  }
  p{
    color: ${theme.colors.neutral[6]};
    font-size: 24px;
    font-weight: 300;
  }
`