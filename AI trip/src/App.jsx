import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
      <h1>Welcome to Begin your Trip!!!!</h1>
      <Button onClick={() => alert('Button clicked!')}>Get Started</Button>
      </div>
      
    </>
  )
}

export default App
