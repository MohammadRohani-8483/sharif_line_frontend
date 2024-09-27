'use client'
import { axiosInstance } from '@/src/utils/helper/axios'
import { T_QuestionareList } from '../utils/types/pages/questionnaire'
import Questionnaire from "@/src/components/pages/questionnaire-list/Questionnaire";
import { useEffect, useMemo, useState } from 'react';
import { orderingItems } from '../utils/staticData/orderingItems';
import { joinQueryStringParams } from '../utils/functions/global';
import { errorHandler } from '../utils/functions/errorHandler';
import { PageCont } from '../styles/common';
import { ModeCont, Navbar, Questionnaires } from '../styles/pages/questionnaire';
import ModeSelect from '../components/pages/questionnaire-list/ModeSelect';
import Ordering from '../components/common/Ordering';
import Paginate from '../components/common/Paginate';
import AddButton from '../components/pages/questionnaire-list/AddButton';
import QuestionnaireSkeleton from '../components/common/QuestionnaireSkeleton';
import { T_Mode, T_Response } from "@/src/utils/types/global";
import { NotFoundSearchContainer, NotFoundTitle } from '../styles/common/search-results';
import { Icon } from '../styles/common/icon';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const [flag, setFlag] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const search = useSearchParams().get('search')

  const [reverseOrder, setReverseOrder] = useState(true)
  const [mode, setMode] = useState<T_Mode>('MIXED')
  const [data, setData] = useState<T_Response<T_QuestionareList> | null>(null)

  const [filter, setFilter] = useState({
    page: 1,
    activeOrder: orderingItems[0],
    page_size: 9
  })
  const queries = useMemo(
    () =>
      "?" +
      joinQueryStringParams({
        page: filter.page,
        page_size: filter.page_size,
        ordering: `${reverseOrder ? "-" : ""}${filter.activeOrder.id}`,
        flag,
        search: search || ''
      }),
    [filter, reverseOrder,search]
  );

  useEffect(() => {
    if (typeof window !== 'undefined')
      document.getElementById('scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoad(true)
    axiosInstance().get<T_Response<T_QuestionareList>>(`question/archive/${queries}`)
      .then(res => {
        setData(res.data)
        setIsLoad(false)
      })
      .catch(err => errorHandler(err.response))
  }, [queries])

  useEffect(() => {
    setFilter(p => ({ ...p, page: 1 }))
  }, [flag])

  return (
    <PageCont>
      <Navbar>
        <ModeCont>
          <ModeSelect
            onClick={() => setMode('ROW')}
            active={mode === 'ROW'}
            icon='row_mode'
          />
          <ModeSelect
            onClick={() => setMode('MIXED')}
            active={mode === 'MIXED'}
            icon='mixed_mode'
          />
        </ModeCont>
        <Ordering
          items={orderingItems}
          active={filter.activeOrder}
          setActive={(activeOrder) => setFilter(p => ({ ...p, activeOrder }))}
          reverse={reverseOrder}
          setReverse={setReverseOrder}
        />
      </Navbar>
      <Questionnaires count={data?.results.length || 9} mode={mode}>
        {!isLoad ?
          data?.results.length ?
            data.results.map(questionnaire => (
              <Questionnaire setFlag={() => setFlag(p => !p)} data={questionnaire} key={questionnaire.id} mode={mode} />
            ))
            :
            <NotFoundSearchContainer
              style={{ gridColumn: "1 / -1", height: "400px" }}
            >
              <Icon name={'SearchNotFound'} width={128} height={128} />
              <NotFoundTitle>
                <p>پرسشنامه ای وجود ندارد.</p>
              </NotFoundTitle>
            </NotFoundSearchContainer>
          :
          Array(9).fill(1).map((_, i) => (
            <QuestionnaireSkeleton key={i} mode={mode} />
          ))
        }
      </Questionnaires>
      <Paginate
        itemsCount={data?.count!}
        activePage={filter.page}
        pageSize={filter.page_size}
        setPage={(page) => setFilter(p => ({ ...p, page }))}
      />
      <div style={{ height: '80px' }}></div>
      <AddButton setFlag={() => setFlag(p => !p)} />
    </PageCont>
  )
}

export default Page