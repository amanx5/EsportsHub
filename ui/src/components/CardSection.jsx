import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardSection({ title, seeAllLink, api }) {
	const [cardsData, setCardsData] = useState([]);
	
	const navigate = useNavigate();

	useEffect(function handleFirstRender() {
		fetchData()			
			.then((data) => {
				if (data?.length) {
					setCardsData(data);
				}
			})
			.catch((error) => {
				console.error(
					'Error in fetching/setting CardSection data:',
					error
				);
			});
	}, []);
	
	async function fetchData() {
		const response = await fetch(api);
		if (response.ok) {
			console.info('Successfully fetched data for ' + api);
			const json = await response.json();
			return json;
		} else {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	}
	
	return (
		<section className='w-full'>
			{/* Header with title + See all button */}
			<div className='flex items-center justify-between mb-3'>
				<h2 className='text-lg font-semibold'>{title}</h2>
				<button
					onClick={() => navigate(seeAllLink)}
					className='text-sm text-blue-500 hover:underline'
				>
					See all
				</button>
			</div>

			{/* Responsive card grid */}
			<div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
				{cardsData.map((item, i) => (
					<div
						key={i}
						className='bg-white dark:bg-neutral-900 shadow rounded-xl overflow-hidden p-3'
					>
						<img
							src={item.image}
							alt={item.title}
							className='w-full h-28 object-cover rounded-md mb-2'
						/>
						<h3 className='text-sm font-medium'>{item.title}</h3>
					</div>
				))}
			</div>
		</section>
	);
}
