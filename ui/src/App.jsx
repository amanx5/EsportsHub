import Navbar from './components/Navbar.jsx';
import Loader from './components/Loader.jsx';
import { pagesConfig } from './config/pages.js';
import useTitle from './hooks/useTitle.jsx';
import { Suspense } from 'react';

export default function App({ pageId }) {
	const { Page, title, style } = pagesConfig[pageId];
	useTitle(title);

	return (
		<AppRoot>
			<Navbar />
			<Suspense fallback={<Loader style={style} />}>
				<PageRoot style={style}>
					<PageWidthController>
						<Page />
					</PageWidthController>
				</PageRoot>
			</Suspense>
		</AppRoot>
	);
}

function AppRoot({ children }) {
	return <div className='flex flex-col w-full h-full'>{children}</div>;
}

function PageRoot({ style, children }) {
	return (
		<main style={style} className={'flex-1 w-full'}>
			{children}
		</main>
	);
}

function PageWidthController({ children}) {
	return (
		<div className='max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8'>{children}</div>
	);
}
