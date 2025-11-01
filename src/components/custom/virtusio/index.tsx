/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Virtuoso as BaseVirtuoso } from "react-virtuoso";
import React, { ComponentType, ReactNode, useCallback } from "react";

type BaseVirtuosoProps<T> = {
  data: T[];
  loadMore?: () => void;
  isLoading?: boolean;
  viewPort?: number;
  style?: React.CSSProperties;
  LoadComp?: ComponentType;
  children: (idx: number, item: T) => ReactNode;
};

function Virtuoso<T>({
  data,
  children,
  loadMore,
  viewPort = 200,
  style = { height: "100vh" },
}: BaseVirtuosoProps<T>) {
  const handleLoadMore = useCallback(() => {
    loadMore?.();
  }, [loadMore]);

  return (
    <BaseVirtuoso
      data={data}
      style={style}
      useWindowScroll
      endReached={handleLoadMore}
      increaseViewportBy={viewPort}
      itemContent={(idx, item) => children(idx, item)}
      computeItemKey={(idx, item: any) => item.id ?? idx}
    />
  );
}

export default Virtuoso;
