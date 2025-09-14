import { useLoaderData } from 'react-router-dom';
import { NavData } from '../../components/Navbar';

export default function () {
	const data = useLoaderData();

	return (
		<>
		<div>tournaments</div>
		<div>
			{
				// value won't update here on expanding/closing menubutton 
				// as tournaments won’t re-render when enableMobileMenu changes
				// since enableMobileMenu is state within Navbar only
				'value = ' + NavData.enableMobileMenu 
				// even if useContext was used, it would also don't react as this component is not subscribed to the state
				// if we move enableMobileMenu state one level up, both approach will give start working, so this is not main issue
			}
		</div>
		</>
	);
}
