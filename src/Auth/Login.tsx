import { useState, type ChangeEvent, type SubmitEvent } from "react";

function Login () {
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div className="login" style={{ display: 'block' }}>
      <div className="ui grid centered">
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <div className="required field">
              <div className="ui icon input">
                <input type="text" name="username" value={name} onChange={handleChangeName} placeholder="Username" />
                <i className="user icon"></i>
              </div>
            </div>
            <div className="required field">
              <div className="ui icon input">
                <input type="password" name="password" value={password} onChange={handleChangePassword} placeholder="Password" />
                <i className="lock icon"></i>
              </div>
            </div>
            <div className="field">
              <div className="ui icon input">
                <input type="submit" value="Login" />
                <i className="right chevron icon"></i>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
