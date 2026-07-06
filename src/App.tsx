import { AppRouter } from "./routes/AppRouter"

function App() {

  return (
    <>
      <div className="ui one column center aligned page grid">
        <div className="column twelve wide">
          <img src="images/logo.svg" alt="logo" />
        </div>
      </div>
      <div className="main container">
        <AppRouter />
      </div>
    </>
  )
}

export default App
