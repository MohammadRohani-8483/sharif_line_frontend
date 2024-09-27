'use client'
import Paginate from '@/src/components/common/Paginate'
import QuestionnaireSkeleton from '@/src/components/common/QuestionnaireSkeleton'
import Questionnaire from '@/src/components/pages/questionnaire-list/Questionnaire'
import { PageCont } from '@/src/styles/common'
import { Questionnaires } from '@/src/styles/pages/questionnaire'
import { errorHandler } from '@/src/utils/functions/errorHandler'
import { joinQueryStringParams } from '@/src/utils/functions/global'
import { axiosInstance } from '@/src/utils/helper/axios'
import { T_QuestionareList } from '@/src/utils/types/pages/questionnaire'
import { useEffect, useMemo, useState } from 'react'
import { T_Response } from "@/src/utils/types/global";
import { NotFoundSearchContainer, NotFoundTitle } from '@/src/styles/common/search-results'
import { Icon } from '@/src/styles/common/icon'

const mode = 'MIXED'

const ArchivePage = () => {
  const [isLoad, setIsLoad] = useState(false)
  const [flag, setFlag] = useState(false)

  const [data, setData] = useState<T_Response<T_QuestionareList> | null>(null)

  const [filter, setFilter] = useState({
    page: 1,
  })

  const queries = useMemo(
    () =>
      "?" +
      joinQueryStringParams({
        page: filter.page,
        page_size: 9,
        deleted_at: true,
        flag
      }),
    [filter]
  );

  useEffect(() => {
    setFilter(p => ({ ...p, page: 1 }))
  }, [flag])

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

  return (
    <PageCont>
      <Questionnaires count={data?.results?.length || 0} mode={mode}>
        {!isLoad ?
          data?.results.length ?
            data.results.map(questionnaire => (
              <Questionnaire setFlag={() => setFlag(p => !p)} data={questionnaire} key={questionnaire.id} mode={mode} isArchive />
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
            <QuestionnaireSkeleton key={i} mode={mode} isArchive />
          ))
        }
      </Questionnaires>
      <Paginate
        activePage={filter.page}
        itemsCount={data?.count || 0}
        pageSize={9}
        setPage={(page) => setFilter(p => ({ ...p, page }))}
      />
      <div style={{ height: '40px' }} />
    </PageCont>
  )
}

export default ArchivePage