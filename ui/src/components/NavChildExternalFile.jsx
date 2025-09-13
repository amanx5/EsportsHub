import { NavData } from "./Navbar";

export default function NavChildExternalFile() {
	return (
		<div className='text-white'>
			{
                // **** NO ISSUE ****
				// This div re-renders whenever enableMobileMenu changes
				// because it's part of Navbar's render tree.
				// NavData is reassigned on every render, so inside Navbar
				// (and its children), it always reflects the latest value.
				// Reactivity here comes from React re-rendering, not from NavData itself.
				'value = ' + NavData.enableMobileMenu
			}
		</div>
	);
}
