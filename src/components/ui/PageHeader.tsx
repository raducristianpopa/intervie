interface Props {
	title: string;
}

const PageHeader = ({ title }: Props) => {
	return (
		<>
			<header className="w-full border-b border-neutral-200 dark:border-neutral-800">
				<div className="mx-auto w-[1248px] max-w-full px-6">
					<div className="my-12 flex">
						<h1 className="text-3xl leading-tight tracking-tighter">{title}</h1>
					</div>
				</div>
			</header>
		</>
	);
};

export default PageHeader;
