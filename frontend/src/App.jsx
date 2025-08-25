import { useState } from 'react'
import Navbar from './components/navbar'
import Home from './components/home'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Navbar />
			<Home />
		</>
	)
}

export default App
