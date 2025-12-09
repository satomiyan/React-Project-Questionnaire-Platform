import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { Typography, Spin, Empty } from 'antd'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant/index'
import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  useTitle('Sedona Questionnaire - My Surveys')

  const [started, setStarted] = useState(false) // whether loading has started (debounced)
  const [page, setPage] = useState(1) // internal page state, not shown in URL
  const [list, setList] = useState([]) // accumulated data
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // Reset when keyword changes
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  // Load data
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  // Try to load more (debounced)
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (!elem) return
      const domRect = elem.getBoundingClientRect()
      if (!domRect) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  // Trigger load on page load or keyword change
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // Trigger load on scroll
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => window.removeEventListener('scroll', tryLoadMore)
  }, [searchParams, haveMoreData])

  // Load more content area
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="No data available" />
    if (!haveMoreData) return <span>No more results...</span>
    return <span>Loading next page...</span>
  }, [started, loading, haveMoreData])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>My Surveys</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {/* Survey list */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>

      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
