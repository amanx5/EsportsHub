import { useLoaderData } from 'react-router-dom';
import { NavData } from '../../components/Navbar';

export default function () {
	const data = useLoaderData();

	return (
		<>
		<div>tournaments</div>
		<div>
			{
				// *** ISSUE IS HERE ***
				// problem with NavData - value doesn't update here on expanding/closing menubutton 
				// as tournaments won’t re-render when enableMobileMenu changes
				// since enableMobileMenu is state within Navbar only
				'value = ' + NavData.enableMobileMenu 
				// if useContext was used, React would subscribe Tournaments to that state. so tournaments would also get re rendered
			}
		</div>
		</>
	);
}
