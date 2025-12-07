import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

function useLoadQuestionDataCopy() {
  const { id = '' } = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(true)
  const [questionData, setQuestionData] = useState([])
  useEffect(() => {
    async function fn() {
      const data = await getQuestionService(id)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setQuestionData(data)
      setLoading(false)
    }

    fn()
  }, [])
  return { loading, questionData }
}

export default useLoadQuestionDataCopy
