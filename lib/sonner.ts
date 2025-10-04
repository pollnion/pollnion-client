import {toast} from 'sonner'

export const successToast = (text: string) => {
  return toast.success(text)
}

export const errorToast = (text: string) => {
  return toast.error(text)
}

export const infoToast = (text: string) => {
  return toast.info(text)
}

export const warningToast = (text: string) => {
  return toast.warning(text)
}
