import { useState } from "react";
import Navbar from "./components/navbar";
import Home from "./homepage/Home.jsx";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Navbar />
			<Home />
		</>
	);
}

export default App;
