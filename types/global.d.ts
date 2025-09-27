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
