import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { api } from "../api/client";
import type { ApiUser } from "../types";
import { ApiError } from "../api/ApiError";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

function Login () {
  const navigate = useNavigate()
  
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const {setCurrentUser} = useAuth()

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function clearForm() {
    setName('')
    setPassword('')
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data: ApiUser = {
        username: name.trim(),
        password
      }
      const player = await api.login(data);
      if (player) {
        setCurrentUser({
          user: player,
          username: name.trim()
        });
        clearForm();
        navigate("/")
      }
    } catch (e) {
      if (e instanceof ApiError) {
        setError(e.message)
      } else {
        setError('Server error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="ui grid centered">
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <div className="required field">
              <div className="ui icon input">
                <input 
                  type="text"
                  name="username"
                  value={name}
                  onChange={handleChangeName}
                  placeholder="Username"
                  required
                />
                <i className="user icon"></i>
              </div>
            </div>
            <div className="required field">
              <div className="ui icon input">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChangePassword}
                  placeholder="Password"
                  required
                />
                <i className="lock icon"></i>
              </div>
            </div>
            <div className="field">
              <div className="ui icon input">
                <input type="submit" value={loading ? "...loading" : "Login"} disabled={loading}/>
                <i className="right chevron icon"></i>
              </div>
            </div>
          </div>
        </form>
      </div>

      {error && (
        <>
          <div className="ui divider" />
          <div className="ui negative message" role="alert">
            <p>{error}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Login;
