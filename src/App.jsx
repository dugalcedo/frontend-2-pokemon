import { useState } from "react"
import PokemonApplication from "./components/PokemonApplication.jsx"

function App() {
  const [started, setStarted] = useState(false)

  return started ? (
    <main>
      <PokemonApplication />
    </main>
  ) : (
    <main>
      <div className="welcome">
        <h1>Welcome to PokémonDB</h1>
        <button onClick={() => setStarted(true)}>
          Start Pokémon App
        </button>
      </div>
    </main>
  )
}

export default App
