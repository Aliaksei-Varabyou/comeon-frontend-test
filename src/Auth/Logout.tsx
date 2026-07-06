import { api } from "../api/client"
import { useAuth } from "../context/AuthContext"

function Logout() {
  const {currentUser, setCurrentUser} = useAuth()

  async function handleLogoutClick() {
    if (currentUser) {
      const {username} = currentUser
      await api.logout(username)
      setCurrentUser(null);
    }
  }

  return (
    <div 
      className="logout ui left floated secondary button inverted"
      onClick={handleLogoutClick}
    >
      <i className="left chevron icon"></i>Log Out
    </div>
  )
}

export default Logout
