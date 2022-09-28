import { ComponentProps } from 'react';

interface Props extends ComponentProps<'svg'> {}

const Avatar = ({ className, ...props }: Props) => {
	return (
		<svg
			viewBox="0 0 80 80"
			fill="none"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			className={className}
			{...props}
		>
			<mask id="mask__bauhaus" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
				<rect width="80" height="80" rx="160" fill="#FFFFFF"></rect>
			</mask>
			<g mask="url(#mask__bauhaus)">
				<rect width="80" height="80" fill="#ad2bad"></rect>
				<rect
					x="10"
					y="30"
					width="80"
					height="80"
					fill="#e42692"
					transform="translate(-10 10) rotate(82 40 40)"
				></rect>
				<circle cx="40" cy="40" fill="#f71568" r="16" transform="translate(-6 6)"></circle>
				<line
					x1="0"
					y1="40"
					x2="80"
					y2="40"
					strokeWidth="2"
					stroke="#f7db15"
					transform="translate(-4 -4) rotate(164 40 40)"
				></line>
			</g>
		</svg>
	);
};

export default Avatar;
