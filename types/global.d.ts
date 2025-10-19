/* eslint-disable @typescript-eslint/no-explicit-any */

type Children = React.ReactNode

// dialogs
type DialogProps = {
  isOpen: boolean
  toggleOpen: () => void
}

// for dynamic objs
type AnyObject = {
  [key: string]: any
}

// used for paths params
type RouteParams = {
  [key: string]: any
}
