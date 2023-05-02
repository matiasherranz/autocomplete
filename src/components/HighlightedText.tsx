import { FC, Fragment, useMemo } from 'react'

interface Props {
  text: string
  highlight: string
}

export const HighlightedText: FC<Props> = ({ text, highlight }) => {
  const parts = useMemo(
    () => text.split(new RegExp(`(${highlight})`, 'gi')),
    [text, highlight]
  )

  if (!highlight) {
    return <>{text}</>
  }

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  )
}
