import { FC, Fragment, useMemo } from 'react'

interface Props {
  text: string
  highlight: string
}

// Inspiration: https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
const escapeRegExpText = (string: string) => {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const HighlightedText: FC<Props> = ({ text, highlight }) => {
  const parts = useMemo(
    // () => text.split(new RegExp(`(${highlight})`, 'gi')),
    () => text.split(new RegExp(`(${escapeRegExpText(highlight)})`, 'gi')),
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
