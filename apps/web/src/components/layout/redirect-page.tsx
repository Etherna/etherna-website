import { useEffect } from "react"

interface RedirectPageProps {
  to: string
}

export function RedirectPage({ to }: RedirectPageProps) {
  useEffect(() => {
    window.location.href = to
  }, [to])

  return null
}
