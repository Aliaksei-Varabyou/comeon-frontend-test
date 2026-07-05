import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { api } from "../api/client";
import type { ApiUser } from "../types";
import { ApiError } from "../api/ApiError";

function Login () {
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data: ApiUser = {
        username: name,
        password
      }
      const response = await api.login(data);
      // ToDO: goto games list page
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
    <div className="login" style={{ display: 'block' }}>
      <div className="ui grid centered">
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <div className="required field">
              <div className="ui icon input">
                <input 
                  type="text"
                  name="username"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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

            {error && <p role="alert" style={{color: 'red'}}>{error}</p>}

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
