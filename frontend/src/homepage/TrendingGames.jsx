import { useEffect, useState } from "react";

const TrendingGames = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let response = await fetch("/api/trendinggames");
				if (!response.ok)
					throw new Error(`HTTP error! status: ${response.status}`);
				let json = await response.json();
				setData(json);
			} catch (error) {
				console.error("Error fetching trending games:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="trendingGames">
			<h1>Most trending Games</h1>
			<div className="home__gamesContainer">
				{data.map((obj) => (
					<div className="home__gameCard" key={obj.gameId}>
						<img src={obj.game.thumbnail} alt={obj.game.name} />
						<p>{obj.game.name}</p>
						<p>Total Players: {obj.totalPlayers}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrendingGames;
