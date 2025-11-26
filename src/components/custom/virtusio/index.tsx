/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Virtuoso as BaseVirtuoso } from "react-virtuoso";
import React, { ComponentType, ReactNode, useCallback } from "react";

type BaseVirtuosoProps<T> = {
  listProps: {
    data: T[];
    fetchNextPage?: () => void;
    isLoading?: boolean;
    viewPort?: number;
    style?: React.CSSProperties;
    LoadComp?: ComponentType;
  };
  children: (idx: number, item: T) => ReactNode;
};

function Virtuoso<T>({ listProps, children }: BaseVirtuosoProps<T>) {
  const {
    data,
    isLoading,
    viewPort = 200,
    style = { height: "100vh" },
    fetchNextPage,
  } = listProps || {};

  const handleLoadMore = useCallback(() => {
    fetchNextPage?.();
  }, [fetchNextPage]);

  if (isLoading) return null;

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
