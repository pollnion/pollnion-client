/* eslint-disable @typescript-eslint/no-explicit-any */

type Children = React.ReactNode

// temp
type ListProps<T> = {
  data: T[]
  isLoading: boolean
}

type DialogProps = {
  isOpen: boolean
  toggleOpen: () => void
}

type AnyObject = {
  [key: string]: any
}
