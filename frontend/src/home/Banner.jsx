export default function Banner() {
	const cards = [
		{
			icon: 'icons/swords.svg',
			alt: 'Compete',
			title: 'JOIN, COMPETE, EARN',
			description:
				'Compete across thousands of free-to-enter esports tournaments',
		},
		{
			icon: 'icons/ladder.svg',
			alt: 'Organise',
			title: 'ORGANISE IT YOUR WAY',
			description:
				'Host tournaments with just one click, or customize it your way',
		},
	];

	return (
		<section className="h-full px-[50px] py-8 sm:py-10 bg-[url('../../backgrounds/trending.jpg')] bg-cover bg-no-repeat select-none text-center">
			<h1 className='text-xl sm:text-3xl lg:text-6xl font-medium text-white'>
				Esports Tournaments
			</h1>

			<div className='m-5 text-4xl sm:text-5xl lg:text-6xl font-medium text-blue-300'>
				Instant &amp; Secure Payments
			</div>

			<div className='hidden sm:block sm:text-2xl font-normal text-white'>
				Supporting payments in USD, Stripe, and Stablecoins!
			</div>

			<button
				type='button'
				className='sm:mt-10 mb-10 px-5 py-2.5 select-none cursor-pointer 
                           bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
                           hover:bg-gradient-to-br font-medium rounded-lg 
                           text-amber-950 text-center'
			>
				GET STARTED
			</button>

			<div className='flex flex-wrap justify-center gap-12'>
				{cards.map((card, i) => (
					<div
						key={i}
						className='flex flex-col items-center card-zoom
								   bg-[radial-gradient(105.95%_123.7%_at_112.13%_-25.13%,rgba(13,101,45,0.6)_0,rgba(24,37,159,0)_100%),radial-gradient(200.16%_172.82%_at_-17.06%_162.5%,#0d2c7c_0,#030202_100%)] 
                                   w-[350px] p-[15px] rounded-[10px] cursor-pointer'
					>
						<img
							src={card.icon}
							alt={card.alt}
							className='w-[45px] h-[45px]'
						/>
						<p className='mt-[10px] text-[18px] font-bold text-white'>
							{card.title}
						</p>
						<p className='mt-[10px] text-[16px] leading-normal text-[#8281a3]'>
							{card.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
