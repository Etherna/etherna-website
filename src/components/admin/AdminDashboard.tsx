import React, { useState, useEffect } from "react"

import classes from "@styles/components/admin/AdminDashboard.module.scss"
import { ReactComponent as SpinnerIcon } from "@images/animated/spinner.svg"

import AdminLoginForm from "./AdminLoginForm"
import AdminHeader from "./AdminHeader"
import Button from "@components/common/Button"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import { isLoggedIn, getCurrentUser, logout } from "@utils/admin"
import gravatar from "@utils/gravatar"

const AdminDashboard = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>()
  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const logged = await isLoggedIn()
      if (logged) {
        const user = getCurrentUser()

        if (!user) return

        setName(user.name)
        setEmail(user.email)
        setAvatar(user.avatar || gravatar(user.email))

        setIsSignedIn(true)
      } else {
        setIsSignedIn(false)
      }
    } catch (error) {
      console.log("not logged in")
      setIsSignedIn(false)
    }
  }

  const signout = async () => {
    await logout()

    setIsSignedIn(false)
    setName(null)
    setEmail(null)
    setAvatar(null)
  }

  return (
    <Container>
      <Row>
        <Col>
          <AdminHeader />

          {isSignedIn && (
            <div className={classes.adminDashboard}>
              <img src={avatar ?? ""} alt={name ?? ""} className={classes.adminProfileAvatar} />
              <h1 className={classes.adminProfileName}>{name}</h1>
              <p className={classes.adminProfileEmail}>{email}</p>

              <Button type="danger" onClick={signout} className="mt-12">
                Sign out
              </Button>
            </div>
          )}

          <div className={classes.adminDashboard}>
            {isSignedIn === null && (
              <SpinnerIcon className="mx-auto" width="30" />
            )}
            {isSignedIn === false && (
              <AdminLoginForm onLogin={checkAuth} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
