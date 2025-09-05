import MoreButton from './MoreButton.jsx';
import { Users2Icon, TrophyIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function () {
	const trendingSection = useRef(null);
	const gameCardWidth = useRef(0);
	const gameCardGap = useRef(0);

	const [gameCardsData, setGameCardsData] = useState([]);
	useEffect(handleFirstRender, []);

	function handleFirstRender() {
		const requiredCards = calculateRequiredCards();
		console.log('Required cards to fetch:', requiredCards);
		if (requiredCards) {
			fetchGameCardsData(requiredCards)
				.then((gameCardsData) => {
					console.log('Fetched cards gameCardsData:', gameCardsData);
					setGameCardsData(gameCardsData);
				})
				.catch((error) => {
					console.error(
						'Error fetching gameCardsData on render:',
						error
					);
				});
		}
	}

	function calculateRequiredCards() {
		const el = trendingSection.current;
		const style = getComputedStyle(el);
		const availableWidth =
			el.clientWidth -
			parseFloat(style.paddingLeft) -
			parseFloat(style.paddingRight);

		if (availableWidth < 250) {
			return 0;
		} else if (250 <= availableWidth && availableWidth < 500) {
			gameCardWidth.current = 100;
			gameCardGap.current = 15;
		} else if (500 <= availableWidth && availableWidth < 1500) {
			gameCardWidth.current = 150;
			gameCardGap.current = 25;
		} else if (1500 <= availableWidth) {
			gameCardWidth.current = 200;
			gameCardGap.current = 30;
		}

		const requiredCards = Math.floor(
			availableWidth / (gameCardWidth.current + gameCardGap.current)
		);
		return requiredCards;
	}

	async function fetchGameCardsData(requiredCards) {
		try {
			const response = await fetch(
				'/api/trending?limit=' + requiredCards
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();
			return json;
		} catch (error) {
			console.error('Error fetching trending games:', error);
		}
	}

	const gameCardStats = [
		{
			IconComponent: Users2Icon,
			dataKey: 'totalPlayers',
			color: 'orange',
		},
		{
			IconComponent: TrophyIcon,
			dataKey: 'totalTournaments',
			color: 'gold',
		},
	];

	return (
		<section
			ref={trendingSection}
			className='py-6 sm:py-10 px-[10%] flex flex-col items-center'
		>
			{gameCardsData.length > 0 && (
				<div>
					<div className='flex px-4 justify-between items-center mb-2.5'>
						{/* section heading - maintain same px as in game cards container*/}
						<h2 className='text-lg sm:text-xl 2xl:text-2xl font-medium bg-gradient-to-r from-[#36fff1] to-[#b5b4ff] text-transparent bg-clip-text'>
							Trending Games
						</h2>
						{/* see all button*/}
						<MoreButton />
					</div>
					{/* game cards container*/}
					<div
						style={{ gap: gameCardGap.current + 'px' }}
						className='flex px-4 py-5 overflow-hidden justify-evenly'
					>
						{/* game card*/}
						{gameCardsData.map((obj) => (
							<a
								key={obj._id}
								style={{
									width: gameCardWidth.current + 'px',
									color: 'aqua',
								}}
								className='flex flex-col border border-black rounded-lg shadow-md card-zoom-05'
								href={`explore?tournamentStatuses=NEW&gameId=${obj._id}`}
							>
								{/* game image*/}
								<img
									src={`resource/images/game-cards/${obj._id}.jpg`}
									alt={obj.name}
									className='w-full h-[80%] min-h-[80%] rounded-md object-cover'
								/>
								{/* game name and gameCardStats container*/}
								<div className='flex flex-col text-xs sm:text-sm lg:text-xl'>
									{/* game name*/}
									<div className='w-full text-center'>
										<p className='my-1 block truncate'>
											{obj.name}
										</p>
									</div>
									{/*game gameCardStats container*/}
									<div className='flex justify-center w-full gap-3 mt-0'>
										{gameCardStats.map(
											(
												{
													IconComponent,
													dataKey,
													color,
												},
												index
											) => (
												<div
													key={index}
													style={{ color: color }}
													className='inline-flex justify-center items-center h-[12px] sm:h-[16px] lg:h-[20px] lg:gap-0.5'
												>
													<IconComponent className='inline h-full w-[12px] sm:w-[16px] lg:w-[20px]' />
													<span className='h-full leading-none'>
														{obj[dataKey] || 0}
													</span>
												</div>
											)
										)}
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
