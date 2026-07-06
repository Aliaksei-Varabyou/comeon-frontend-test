import { useAuth } from "../context/AuthContext"
import type { User } from "../types"

function Player() {
  const {currentUser} = useAuth()
  const user: User | undefined = currentUser?.user
  
  return (
    <div className="player item">
      <img className="ui avatar image" src={user?.avatar} alt="avatar" />

      <div className="content">
        <div className="header"><b className="name">{user?.name}</b></div>
        <div className="description event">{user?.event}</div>
      </div>
    </div>
  )
}

export default Player
