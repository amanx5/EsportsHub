import React from 'react'

const home = () => {
	let games = []

	let trendingGames = (
		<div className='trendingGames'>
			<h1>Most trending Games</h1>
			<div className='home__gamesContainer'>{
				games.map(
					(game, index) => (
						<div className='home__gameCard' key={index}>		
							<img src={game.thumbnail} alt={game.title} />
							<p>{game.title}</p>
						</div>
					)
				)
			}</div>
		</div>
	);

	let upcomingTournaments = (
		<div className='home'>
			<h1>Upcoming Tournaments</h1>
		</div>
	);

	return (
		<div className='home'>
			{trendingGames}
			{upcomingTournaments}	
		</div>
	);
}

export default home