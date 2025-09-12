import Navbar from './components/Navbar.jsx';
import Loader from './components/Loader.jsx';
import { pagesConfig } from './config/pages.js';
import useTitle from './hooks/useTitle.jsx';
import { Suspense } from 'react';

export default function App({ pageId }) {
	const { Page, title, style } = pagesConfig[pageId];
	useTitle(title);

	return (
		<AppWrapper>
			<Navbar />
			<Suspense fallback={<Loader style={style} />}>
				<PageWrapper style={style}>
					<Page />
				</PageWrapper>
			</Suspense>
		</AppWrapper>
	);
}

function AppWrapper({ children }) {
	return <div className='flex flex-col h-full w-full'>{children}</div>;
}

function PageWrapper({ style, children }) {
	return (
		<main style={style} className={'px-[10%] flex-1 w-full'}>
			{children}
		</main>
	);
}
