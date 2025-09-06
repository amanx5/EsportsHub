// static imports
import '@/index.css';
import LoadingPage from '@/components/LoadingPage.jsx';
import ErrorPage from '@/components/ErrorPage.jsx';
import { lazy, Suspense, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// lazy imports
const Home = lazy(() => import('@/home/Home.jsx'));
const Tournament = lazy(() => import('@/tournament/Tournament.jsx'));

// routes
const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/tournament/:tournamentId?',	// ? optional param
		// loader: fetchData,
		element: <Tournament />,
	},
	// {
		// path: '/tournament',
		// element: <Tournament />, // wrapper (parent): will always render
		// children: [
			// { index: true, element: <Tournament /> }, // matches "/tournament"
			// { path: ':tournamentId', element: <TournamentDetail /> }, // matches "/tournament/123"
		// ],
	// },
]);

// rendering
createRoot(document.getElementById('root')).render(
	// <StrictMode>
		<Suspense fallback={<LoadingPage/>}>
			<RouterProvider router={router} />
		</Suspense>
	// </StrictMode>
);
