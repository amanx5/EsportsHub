export default function Loader({ text, style }) {
	console.log(text);

	return (
		<div style={style} className='flex flex-col items-center justify-center h-full'>
			<div className='w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin'></div>
			{text && <p className='mt-4'>{text}</p>}
		</div>
	);
}
