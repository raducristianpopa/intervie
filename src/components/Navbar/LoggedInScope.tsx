import Divider from '@components/ui/Divider';
import Link from '@components/ui/Link';

const LoggedInScope = () => {
	return (
		<>
			{/* BEGIN Divider */}
			<li className="flex flex-grow-0 flex-shrink-0 ml-2 basis-auto">
				<Divider />
			</li>
			{/* END Divider */}
			{/* BEGIN User */}
			<li className="flex flex-grow-0 flex-shrink min-w-0 basis-auto">
				<div className="flex items-center justify-start max-w-full">
					<Link href="/" className="flex items-center justify-start max-w-full">
						{/* BEGIN Name */}
						<p className="inline-block max-w-full min-w-0 px-2 overflow-hidden font-medium leading-5 text-white text-ellipsis whitespace-nowrap">
							Radu Cristian
						</p>
						{/* END Name */}
						{/* BEGIN Plan */}
						<div className="hidden md:block">
							<span className="inline-flex items-center h-5 px-2 text-xs font-medium leading-none text-black capitalize bg-white rounded-full whitespace-nowrap">
								PLAN
							</span>
						</div>
						{/* END Plan */}
					</Link>
				</div>
			</li>
			{/* END User */}
		</>
	);
};

export default LoggedInScope;
