import { useRouteError } from 'react-router-dom';

export default function RouteError({}) {
	const error = useRouteError();
	console.error(error);
	const showErrorDetails =
		import.meta.env.MODE === 'development' &&
		import.meta.env.VITE_SHOW_ERROR_DETAILS === 'true' // we can custom env variables like this
			? true
			: false;

	return (
		<div className='flex items-center justify-center h-full'>
			<div className='bg-white shadow-lg rounded-2xl p-8 max-w-md text-center'>
				<h1 className='text-4xl font-bold text-red-500 mb-4'>
					{error.status || 'Error'}
				</h1>
				<p className='text-gray-700 mb-2'>
					{error.statusText || 'Something went wrong.'}
				</p>

				{/* Show details only in dev mode */}
				{showErrorDetails && (
					<p className='text-sm text-gray-500 italic mt-4'>
						{error.message || error.data}
					</p>
				)}
			</div>
		</div>
	);
}
