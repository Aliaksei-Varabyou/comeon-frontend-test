import { AppRouter } from "./routes/AppRouter"

function App() {

  return (
    <div className="site-content">
      <div className="ui one column center aligned page grid">
        <div className="column twelve wide">
          <img src="images/logo.svg" alt="logo" />
        </div>
      </div>
      <div className="main container">
        <AppRouter />
      </div>
    </div>
  )
}

export default App
