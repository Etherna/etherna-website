import React, { useState } from "react"

import { ReactComponent as SpinnerIcon } from "@images/animated/spinner-light.svg"

import Button from "@components/common/Button"
import Alert from "@components/common/Alert"
import TextField from "@components/common/TextField"
import InputGroup from "@components/common/InputGroup"
import { authenticate } from "@utils/admin"

type AdminLoginFormProps = {
  onLogin?(): void
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogginIn, setIsLogginIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const login = async (e?: React.FormEvent) => {
    e?.preventDefault()

    setIsLogginIn(true)
    try {
      await authenticate(email, password)
      onLogin?.()
    } catch (error: any) {
      setErrorMessage(error.message || "Invalid credentials")
    }
    setIsLogginIn(false)
  }

  return (
    <form onSubmit={login}>
      {errorMessage && (
        <div className="mb-4">
          <Alert type="danger" title="Login error" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        </div>
      )}
      <InputGroup>
        <TextField
          type="email"
          name="email"
          autocomplete="email"
          className="form-control"
          placeholder={"Email"}
          value={email}
          onChange={setEmail}
          required
        />
        <TextField
          type="password"
          autocomplete="current-password"
          className="form-control"
          placeholder={"Password"}
          value={password}
          onChange={setPassword}
          required
        />
      </InputGroup>
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

export default AdminLoginForm
