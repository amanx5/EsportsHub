import Banner from './Banner.jsx';
import Trending from './Trending.jsx';
import Navbar from '../components/Navbar.jsx';

export default function Home() {
	return (
		<>
			<Navbar />
			<main className='home h-full'>
				<Banner />
				<Trending />
			</main>
		</>
	);
}
