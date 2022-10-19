export function Shimmer() {
	return (
		<div className="flex animate-pulse flex-col space-y-4">
			<div className="h-6 w-1/2 rounded-lg bg-gray-500 bg-opacity-25"></div>
			<div className="h-6 w-2/3 rounded-lg bg-gray-500 bg-opacity-25"></div>
			<div className="h-6 w-5/6 rounded-lg bg-gray-500 bg-opacity-25"></div>
		</div>
	);
}
