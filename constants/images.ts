import urlJoin from 'url-join'

const IMAGE_LINK = process.env.NEXT_PUBLIC_IMAGE_LINK

export const IMAGE_LOGO_TEXT = urlJoin(IMAGE_LINK as string, 'XMsY9ZK/Pollnion-3.png')
export const IMAGE_LOGO = urlJoin(IMAGE_LINK as string, 'NvXkcP7/pollnion-logo.png')
