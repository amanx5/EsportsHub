import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MoreButton(props) {
	return (
		<Link
			to={props.linkTo}
			className='bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors flex items-center rounded-lg min-h-[30px] max-w-[100px] px-[10px] pr-[5px] py-[10px] font-semibold text-[#1fd2f1] hover:text-cyan-300 cursor-pointer select-none text-[12px] sm:text-[16px]'
		>
			<div className='no-underline font-medium uppercase'>SEE ALL</div>
			<ChevronRight className='w-[12px] sm:w-[16px]' />
		</Link>
	);
}
