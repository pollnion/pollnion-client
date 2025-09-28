import React from 'react'
import {createContext, useState} from 'react'
import CreatePollForm from '../forms/create-poll-form'
import BaseDialog from '../dialogs/base-dialog'
// import useCreatePoll from '@/hooks/feed/use-create-poll'

type DefautlValue = {} & DialogProps

const defautlValue = {
  isOpen: false,
  toggleOpen: () => {},
}

export const CreatePollContext = createContext(defautlValue as DefautlValue)

const CreatePollProvider = ({children}: {children: Children}) => {
  //   const {form} = useCreatePoll()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <CreatePollContext.Provider value={{toggleOpen, isOpen}}>
      {children}

      <BaseDialog type="form" title="Create poll" isOpen={isOpen} toggleOpen={toggleOpen}>
        <CreatePollForm />
      </BaseDialog>
    </CreatePollContext.Provider>
  )
}

export default CreatePollProvider
