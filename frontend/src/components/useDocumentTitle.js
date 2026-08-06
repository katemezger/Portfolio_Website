import { useEffect } from 'react'

// Keeps the browser tab title in sync with whichever page is actually
// mounted, so bookmarking/history/multiple-tabs all show something useful
// instead of the same static title from index.html on every route.
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
