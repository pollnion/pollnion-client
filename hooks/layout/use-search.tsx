import {useForm} from 'react-hook-form'
import {useCallback, useMemo} from 'react'
import debounce from 'lodash/debounce'
import useFilter from '../filters/useFilter'
import useGetAllParams from '../filters/useGetAllParams'

const defaultValues = {search: ''}

const useSearch = () => {
  const form = useForm({defaultValues})
  const {pushQuery} = useFilter()
  const params = useGetAllParams()

  // stable debounced function
  const debouncedPush = useMemo(
    () => debounce((item: string) => pushQuery({q: item}), 500),
    [pushQuery]
  )

  const onChange = useCallback(
    (item: string) => debouncedPush(item),
    [debouncedPush]
  )

  return {form, onChange}
}

export default useSearch
