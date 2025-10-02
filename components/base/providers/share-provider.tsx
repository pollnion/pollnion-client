'use client'

import React, {createContext, useState} from 'react'
import {Copy, Forward, Link} from 'lucide-react'
import BaseInput from '../inputs/base-input'
import BaseDialog from '../dialogs/base-dialog'
import BaseButton from '../buttons/base-button'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'
import {TypographySmall} from '../typography/base-typography'

type DefaultValue = DialogProps

const defaultValue = {
  isOpen: false,
  toggleOpen: () => {},
}

export const ShareContext = createContext(defaultValue as DefaultValue)

const ShareApp = ({isOpen, toggleOpen}: DefaultValue) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const shareUrl = url
  const title = 'Check this out!'

  return (
    <BaseDialog
      title="Share Pollnion"
      isOpen={isOpen}
      className="w-[480px]"
      toggleOpen={toggleOpen}
    >
      <TypographySmall>Share this via link</TypographySmall>
      <div className="flex space-x-3">
        <FacebookShareButton url={shareUrl} title={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <LinkedinShareButton url={shareUrl} title={title} summary="A cool page">
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <TypographySmall>Or copy link</TypographySmall>
      <BaseInput
        readOnly
        icon={Link}
        value={url}
        iconDirection="left"
        withButton={{label: 'Copy', icon: Copy, onClick: () => console.log('Copied')}}
      />
    </BaseDialog>
  )
}

const ShareProvider = ({children}: {children: Children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <ShareContext.Provider value={{isOpen, toggleOpen}}>
      {children}
      <ShareApp isOpen={isOpen} toggleOpen={toggleOpen} />
    </ShareContext.Provider>
  )
}

export default ShareProvider
