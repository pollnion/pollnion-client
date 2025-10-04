import {useContext} from 'react'
import {LayoutContext} from '@/components/base/providers/layout-provider'

export const useLayout = () => useContext(LayoutContext)
