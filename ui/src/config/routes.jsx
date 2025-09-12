import App from '../App.jsx';
import RouteError from '../components/RouteError.jsx';

export const routes = [
	{
		path: '/',
		element: <App pageId='home' />,
		errorElement: <RouteError />,
	},
	{
		path: '/tournament/:tournamentId?', // ? indicates optional param
		// loader: fetchData,
		element: <App pageId='tournaments' />,
	},
	{
		path: '/leaderboard',
		// loader: fetchData,
		element: <App pageId='leaderboard' />,
	},
	{
		path: '/profile',
		// loader: fetchData,
		element: <App pageId='profile' />,
	},
	// {
	// path: '/tournament',
	// element: <Tournament />, // wrapper (parent): will always render
	// children: [
	// { index: true, element: <Tournament /> }, // matches "/tournament"
	// { path: ':tournamentId', element: <TournamentDetail /> }, // matches "/tournament/123"
	// ],
	// },
];
