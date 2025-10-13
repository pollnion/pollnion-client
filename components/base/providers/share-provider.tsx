'use client'

import React from 'react'
import {Copy, Link} from 'lucide-react'
import {createContext, useState} from 'react'
import {TwitterShareButton, TwitterIcon} from 'react-share'
import {WhatsappShareButton, WhatsappIcon} from 'react-share'
import {LinkedinShareButton, LinkedinIcon} from 'react-share'
import {FacebookShareButton, FacebookIcon} from 'react-share'

import BaseInput from '../inputs/base-input'
import BaseDialog from '../dialogs/base-dialog'
import {TypographySmall} from '../typography/base-typography'

import {useCopyToClipboard} from '@/hooks/layout/use-copy'

type DefaultValue = DialogProps

const defaultValue = {
  isOpen: false,
  toggleOpen: () => {},
}

export const ShareContext = createContext(defaultValue as DefaultValue)

const shareButtons = [
  {
    Component: FacebookShareButton,
    Icon: FacebookIcon,
    props: {},
  },
  {
    Component: TwitterShareButton,
    Icon: TwitterIcon,
    props: {},
  },
  {
    Component: LinkedinShareButton,
    Icon: LinkedinIcon,
    props: {summary: 'A cool page'},
  },
  {
    Component: WhatsappShareButton,
    Icon: WhatsappIcon,
    props: {separator: ':: '},
  },
]

const SocialShare = ({shareUrl, title}: {shareUrl: string; title: string}) => (
  <div className="flex gap-2">
    {shareButtons.map(({Component, Icon, props}, i) => (
      <Component key={i} url={shareUrl} title={title} {...props}>
        <Icon size={32} round />
      </Component>
    ))}
  </div>
)

const ShareApp = ({isOpen, toggleOpen}: DefaultValue) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const {copy, copied} = useCopyToClipboard()

  const TITLE = 'Check this out!'
  const SHARE_URL = url

  return (
    <BaseDialog
      isOpen={isOpen}
      className="w-[480px]"
      title="Share Pollnion"
      toggleOpen={toggleOpen}
    >
      <TypographySmall>Share this via link</TypographySmall>
      <div className="flex space-x-3">
        <SocialShare shareUrl={SHARE_URL} title={TITLE} />
      </div>

      <TypographySmall>Or copy link</TypographySmall>
      <BaseInput
        readOnly
        icon={Link}
        value={url}
        iconDirection="left"
        withButton={{
          icon: Copy,
          label: copied ? 'Copied' : 'Copy',
          onClick: () => copy(SHARE_URL),
        }}
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
