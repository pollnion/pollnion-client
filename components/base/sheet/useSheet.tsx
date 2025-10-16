import {useState} from 'react'

const useSheet = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return {isOpen, toggleOpen}
}

export default useSheet
