import '@/index.css';
import Home from '@/home/Home.jsx';
import Tournament from '@/tournament/Tournament.jsx';
import RouteErrorPage from '@/components/RouteErrorPage.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <RouteErrorPage />,
		element: <Home />,
	},
	// {
	// 	path: '/tournament/',
	// 	element: <Tournament/>
	// },
	{
		path: '/tournament/:tournamentId?',	// ? optional param
		element: <Tournament />,
	},
	{
		path: '/tournament',
		element: <Tournament />, // wrapper (parent): will always render
		children: [
			{ index: true, element: <Tournament /> }, // matches "/tournament"
			// { path: ':tournamentId', element: <TournamentDetail /> }, // matches "/tournament/123"
		],
	},
]);

createRoot(document.getElementById('root')).render(
	// <StrictMode>
		<RouterProvider router={router} />
	// </StrictMode>
);
