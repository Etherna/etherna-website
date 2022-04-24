import React from "react"

import classes from "@styles/components/site/FunnelSuccess.module.scss"

type FunnelSuccessProps = {
  message: string
}

const FunnelSuccess: React.FC<FunnelSuccessProps> = ({ message }) => {
  return (
    <div className={classes.funnelSuccess}>
      {message}
    </div>
  )
}

export default FunnelSuccess
