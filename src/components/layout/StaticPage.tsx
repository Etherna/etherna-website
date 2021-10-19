import React from "react"

import classes from "@styles/components/layout/StaticPage.module.scss"

type StaticPageProps = {
  title?: string
}

const StaticPage: React.FC<StaticPageProps> = ({ title, children }) => {
  return (
    <div className={classes.staticPage}>
      <div className="container">
        <div className="row">
          {title && (
            <div className="col w-full">
              <h1>{title}</h1>
            </div>
          )}
          <div className="col w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaticPage
