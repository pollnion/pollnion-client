/* eslint-disable @typescript-eslint/no-explicit-any */

const usePassCheck = () => {
  const passwordReq = (password: string): {text: string; match: boolean}[] => {
    return [
      {
        text: 'Must be at least 8 characters',
        match: (password || '').length >= 8,
      },
      {
        text: 'Must contain at least 1 uppercase letter.',
        match: /[A-Z]/.test(password),
      },
      {
        text: 'Must contain at least 1 lowercase letter',
        match: /[a-z]/.test(password),
      },
      {
        text: 'Must contain at least 1 number',
        match: /\d/.test(password),
      },
    ]
  }

  const isPassValid = (password: boolean | any): boolean => {
    return passwordReq(password).every((item) => item.match === true)
  }

  return {passwordReq, isPassValid}
}

export default usePassCheck
