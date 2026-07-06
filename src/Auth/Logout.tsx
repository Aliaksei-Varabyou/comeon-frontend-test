import { useNavigate } from "react-router"
import { api } from "../api/client"
import { useAuth } from "../context/AuthContext"

function Logout() {
  const navigate = useNavigate()
  const {currentUser, setCurrentUser} = useAuth()

  async function handleLogoutClick() {
    if (currentUser) {
      try {
        const {username} = currentUser
        await api.logout(username.trim())
      } finally {
        setCurrentUser(null);
        navigate("/login");
      }
    }
  }

  return (
    <div 
      className="logout ui left floated secondary button inverted"
      role="button"
      onClick={handleLogoutClick}
    >
      <i className="left chevron icon"></i>Log Out
    </div>
  )
}

export default Logout
