import {useForm} from 'react-hook-form'
import {useCallback} from 'react'
import {debounce} from 'lodash'
import useFilter from '../filters/useFilter'
import useGetAllParams from '../filters/useGetAllParams'

const defaultValues = {search: ''}

const useSearch = () => {
  const form = useForm({defaultValues})
  const {pushQuery} = useFilter()
  const params = useGetAllParams()

  // stable debounced function
  const debouncedPush = useCallback(
    debounce((item: string) => pushQuery({q: item}), 500),
    [pushQuery]
  )

  const onChange = (item: string) => debouncedPush(item)

  return {form, onChange}
}

export default useSearch
