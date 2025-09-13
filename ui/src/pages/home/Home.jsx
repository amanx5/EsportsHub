import CardSection from '../../components/CardSection.jsx';

export default function Home({background}) {
	return (
		<>
			<BannerSection/>
			<CardSection title='Trending Games' api='/api/trending?limit=10' />
		</>
	);
}

function BannerSection() {
	return (
		<section className='w-full py-12 sm:py-20 select-none text-center text-white'>
			<h1 className='text-xl sm:text-3xl lg:text-6xl font-medium '>
				Esports Tournaments
			</h1>
			<div className='my-5 text-4xl sm:text-5xl lg:text-6xl font-medium text-blue-300'>
				Instant &amp; Secure Payments
			</div>
			<div className='hidden sm:block sm:text-2xl font-normal '>
				Supporting payments in USD, Stripe, and Stablecoins!
			</div>
			<button
				type='button'
				className='mb-10 sm:mt-10 px-5 py-2.5 select-none cursor-pointer 
							text-xs sm:text-lg text-amber-950 text-center
                        	bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
                        	hover:bg-gradient-to-br font-medium rounded-lg'
			>
				GET STARTED
			</button>
		</section>
	);
}



