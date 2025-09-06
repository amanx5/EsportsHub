import Banner from './Banner.jsx';
import Trending from './Trending.jsx';
import Navbar from '../components/Navbar.jsx';
import { useLoaderData } from 'react-router-dom';


export default function Home() {
	const data = useLoaderData(); 
	return (
		<>
			<Navbar />
			<main className='home h-full'>
				<Banner />
				<Trending data={data}/>
			</main>
		</>
	);
}
