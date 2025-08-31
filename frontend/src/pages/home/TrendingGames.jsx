import { useEffect, useState } from 'react';

function TrendingGames() {
	const [data, setData] = useState([]);

	useEffect(handleFirstRender, []);

	function handleFirstRender() {
		fetchData()
			.then((data) => {
				console.log('Data fetched successfully');
				setData(data);
			})
			.catch((error) => {
				console.error('Error fetching data on render:', error);
			});
	}

	async function fetchData() {
		try {
			const response = await fetch('/api/trendinggames');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();
			return json;
		} catch (error) {
			console.error('Error fetching trending games:', error);
		}
	}

	return (
		<div className='trendingGames'>
			<h1>Most trending Games</h1>
			<div className='home__gamesContainer'>
				{data.map((obj) => (
					<div className='home__gameCard' key={obj.gameId}>
						<img src={obj.game.thumbnail} alt={obj.game.name} />
						<p>{obj.game.name}</p>
						<p>Total Players: {obj.totalPlayers}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default TrendingGames;
