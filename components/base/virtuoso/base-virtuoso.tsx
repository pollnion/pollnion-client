import {Virtuoso} from 'react-virtuoso'
import React, {ComponentType, ReactNode} from 'react'

type BaseVirtuosoProps<T> = ReadType<T> & {
  viewPort?: number

  LoadComp: ComponentType
  style?: React.CSSProperties
  children: (idx: number, item: T) => ReactNode
}

function BaseVirtuoso<T>({
  data,
  children,
  loadMore,
  LoadComp,
  isLoading,
  viewPort = 200,
  style = {height: '100vh'},
}: BaseVirtuosoProps<T>) {
  // default loading data
  if (isLoading) return Array.from({length: 10}).map((_, idx) => <LoadComp key={idx} />)

  return (
    <Virtuoso
      data={data}
      style={style}
      useWindowScroll
      endReached={loadMore}
      increaseViewportBy={viewPort}
      itemContent={(idx, item) => children(idx, item)}
      components={{Footer: isLoading ? LoadComp : undefined}}
      computeItemKey={(idx, item: any) => item.id ?? idx} // 👈 prevents key resets
    />
  )
}

export default BaseVirtuoso
