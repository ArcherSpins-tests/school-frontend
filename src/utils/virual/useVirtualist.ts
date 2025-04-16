import { useRef, useState, useEffect, useCallback, useMemo } from 'react'

interface UseVariableVirtualListOptions {
  estimatedItemHeight?: number
  overscan?: number
}

export function useVariableVirtualList<T>(
  list: T[],
  { estimatedItemHeight = 60, overscan = 5 }: UseVariableVirtualListOptions
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [height, setHeight] = useState(0)
  const heightsRef = useRef<Map<number, number>>(new Map())

  const getItemOffset = useCallback(
    (index: number) => {
      let offset = 0
      for (let i = 0; i < index; i++) {
        offset += heightsRef.current.get(i) ?? estimatedItemHeight
      }
      return offset
    },
    [estimatedItemHeight]
  )

  const totalHeight = useMemo(() => {
    let total = 0
    for (let i = 0; i < list.length; i++) {
      total += heightsRef.current.get(i) ?? estimatedItemHeight
    }
    return total
  }, [list.length, estimatedItemHeight])

  const findStartIndex = useCallback(() => {
    let low = 0
    let high = list.length - 1
    let offset = 0

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      offset = getItemOffset(mid)
      if (offset < scrollTop) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
    return Math.max(0, low - 1)
  }, [scrollTop, list.length, getItemOffset])

  const startIndex = findStartIndex()

  let visibleCount = 0
  let visibleHeight = 0
  for (let i = startIndex; i < list.length && visibleHeight < height; i++) {
    visibleHeight += heightsRef.current.get(i) ?? estimatedItemHeight
    visibleCount++
  }

  const endIndex = Math.min(list.length, startIndex + visibleCount + overscan)

  const visibleItems = useMemo(() => {
    const items = []
    let offset = getItemOffset(startIndex)
    for (let i = startIndex; i < endIndex; i++) {
      items.push({
        data: list[i],
        index: i,
        top: offset,
        measureRef: (el: HTMLDivElement | null) => {
          if (el) {
            const height = el.offsetHeight
            if (heightsRef.current.get(i) !== height) {
              heightsRef.current.set(i, height)
            }
          }
        },
      })
      offset += heightsRef.current.get(i) ?? estimatedItemHeight
    }
    return items
  }, [startIndex, endIndex, list, getItemOffset, estimatedItemHeight])

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.clientHeight)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const onScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop)
    }
  }

  const containerProps = {
    ref: containerRef,
    onScroll,
    style: {
      overflowY: 'auto',
      position: 'relative' as const,
    },
  }

  const innerProps = {
    style: {
      height: totalHeight,
      position: 'relative' as const,
    },
  }

  return {
    containerProps,
    innerProps,
    visibleItems,
  }
}
