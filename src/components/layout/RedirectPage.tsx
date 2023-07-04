import { useEffect } from "react"

type RedirectPageProps = {
  to: string
}

const RedirectPage: React.FC<RedirectPageProps> = ({ to }) => {
  useEffect(() => {
    window.location.href = to
  }, [to])

  return null
}

export default RedirectPage
