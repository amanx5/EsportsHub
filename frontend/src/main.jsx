import './css/index.css';
import Page from './Page.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InvalidPage from './components/UnexpectedRoute.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <InvalidPage />,
		element: <Page />,
	},
	{
		path: '/:pagePath',
		element: <Page />,
	},
	{
		path: '/:pagePath/:subPagePath',
		element: <Page />,
	},
]);

const reactRoot = createRoot(document.getElementById('root'));
reactRoot.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
