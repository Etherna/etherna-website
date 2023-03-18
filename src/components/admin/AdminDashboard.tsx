import React, { useState, useEffect } from "react"

import { ReactComponent as SpinnerIcon } from "@/assets/animated/spinner.svg"

import AdminHeader from "./AdminHeader"
import AdminLoginForm from "./AdminLoginForm"
import Button from "@/components/common/Button"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import { isLoggedIn, getCurrentUser, logout } from "@/utils/admin"
import gravatar from "@/utils/gravatar"

const AdminDashboard: React.FC = () => {
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
            <div className="mx-auto max-w-md px-10">
              <img
                src={avatar ?? ""}
                alt={name ?? ""}
                className="h-16 w-16 overflow-hidden rounded-full"
              />
              <h1 className="mb-4 text-gray-900">{name}</h1>
              <p className="text-gray-600">{email}</p>

              <Button type="danger" onClick={signout} className="mt-12">
                Sign out
              </Button>
            </div>
          )}

          <div className="mx-auto max-w-md px-10">
            {isSignedIn === null && <SpinnerIcon className="mx-auto" width="30" />}
            {isSignedIn === false && <AdminLoginForm onLogin={checkAuth} />}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
