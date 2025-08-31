import { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import TrendingGames from "./TrendingGames.jsx";



// ************************************ HOME PAGE COMPONENT ************************************
export default function () {
	const [count, setCount] = useState(0);


	return (
		<div>
			<div className='home'>
                <TrendingGames />
            </div>
		</div>
	);
}