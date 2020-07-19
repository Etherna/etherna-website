import React, { useState } from "react"
import PropTypes from "prop-types"

import SpinnerIcon from "!svg-react-loader!@images/animated/spinner-light.svg"
import Button from "@components/common/Button"
import Alert from "@components/common/Alert"
import { authenticate } from "@utils/admin"

const AdminLoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogginIn, setIsLogginIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const login = async e => {
    e.preventDefault()

    setIsLogginIn(true)
    try {
      await authenticate(email, password)
      onLogin && onLogin()
    } catch (error) {
      setErrorMessage(error.message || "Invalid credentials")
    }
    setIsLogginIn(false)
  }

  return (
    <form onSubmit={login}>
      <div className="input-group">
        {errorMessage && (
          <div className="mb-4">
            <Alert type="danger" onClose={() => setErrorMessage(null)}>
              {errorMessage}
            </Alert>
          </div>
        )}
        <input
          type="email"
          name="email"
          autoComplete="email"
          className="form-control"
          placeholder={"Email"}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          autoComplete="password"
          className="form-control"
          placeholder={"Password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        type="primary"
        className="w-full"
        disabled={isLogginIn}
        onClick={login}
      >
        {isLogginIn && (
          <SpinnerIcon width="16" height="16" className="inline-block mr-2" />
        )}
        Login
      </Button>
    </form>
  )
}

AdminLoginForm.propTypes = {
  onLogin: PropTypes.func,
}

export default AdminLoginForm
