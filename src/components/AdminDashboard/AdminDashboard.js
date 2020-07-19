import React, { useState, useEffect } from "react"

import SpinnerIcon from "!svg-react-loader!@images/animated/spinner.svg"
import AdminLoginForm from "./AdminLoginForm"
import AdminHeader from "./AdminHeader"
import { isLoggedIn, getCurrentUser, logout } from "@utils/admin"
import gravatar from "@utils/gravatar"

import "./admin-dashboard.scss"
import Button from "@components/common/Button"

const AdminDashboard = () => {
  const [isSignedIn, setIsSignedIn] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const logged = await isLoggedIn()
      if (logged) {
        const user = getCurrentUser()
        setName(user.name)
        setEmail(user.email)
        setAvatar(user.avatar || gravatar(user.email))

        setIsSignedIn(true)
      } else {
        setIsSignedIn(false)
      }
    } catch (error) {
      console.log('not logged in');
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
    <div className="container">
      <div className="row">
        <div className="col">
          <AdminHeader />

          {isSignedIn && (
            <div className="admin-profile">
              <img src={avatar} alt={name} className="admin-profile-avatar" />
              <h1 className="admin-profile-name">{name}</h1>
              <p className="admin-profile-email">{email}</p>

              <Button type="danger" onClick={signout} className="mt-12">
                Sign out
              </Button>
            </div>
          )}

          <div className="admin-dashboard">
            {isSignedIn === null && (
              <SpinnerIcon className="mx-auto" width="30" />
            )}
            {isSignedIn === false && (
              <AdminLoginForm onLogin={checkAuth} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
