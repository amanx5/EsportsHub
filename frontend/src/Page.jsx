import Navbar from './components/Navbar.jsx';
import PageLoader from './components/PageLoader.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

const pages = {
	home: {
		import: () => import('./pages/home/Home.jsx'),
	},
	user: {
		import: () => import('./pages/user/User.jsx'),
	},
};

export default function Page() {
	const params = useParams();
	const pageName = params.pagePath || 'home';

	if (pageName in pages) {
		const page = pages[pageName];
		const PageComponent = lazy(page.import);

		return (
			<>
				{!page.hideNavbar && <Navbar />}
				<Suspense fallback={<PageLoader />}>
					<PageComponent />
				</Suspense>
			</>
		);
	} else {
		return <PageNotFound />;
	}
}
