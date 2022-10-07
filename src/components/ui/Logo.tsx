import { ComponentProps } from 'react';

interface Props extends ComponentProps<'svg'> {}

export const IconOnlyLogo = ({ className, ...props }: Props) => {
	return (
		<svg
			width="1000"
			height="1000"
			className={className}
			viewBox="0 0 1000 1000"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M500 1000C776.156 1000 1000 776.156 1000 500C1000 223.844 776.156 0 500 0C223.844 0 0 223.844 0 500C0 776.156 223.844 1000 500 1000ZM463.031 200.656H525.531V478.344H803.25V540.844H463.031V200.656ZM276.812 214.312H339.312V660.656H785.656V723.156H276.812V214.312Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const TextOnlyLogo = ({ className, ...props }: Props) => {
	return (
		<svg
			width="250"
			height="32"
			className={className}
			viewBox="0 0 250 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M5.52049 13.0784V0H0V31.4144H5.52049V13.0784ZM22.8051 31.3486H28.2599V14.5898L22.8051 6.90059V31.3489V31.3486ZM44.6245 0.065615V21.6874L29.1806 0.065615H23.2657L45.4789 31.3488H50.0136V0.065615H44.6245ZM72.8179 5.19199H82.7417V0.0657833H57.374V5.19199H72.8179ZM67.2978 10.3184H72.8183V31.3488H67.2978V10.3184ZM92.0084 0.065615H115.405V5.06034H92.0084V0.065615ZM92.0084 26.3538H115.339V31.3486H92.0084V26.3538ZM92.0084 13.0784H113.104V18.0074H92.0084V13.0784ZM150.631 31.3486L142.153 19.5185C143.292 19.168 144.3 18.7518 145.176 18.2699C146.14 17.6565 146.928 16.9775 147.542 16.2326C148.243 15.4002 148.747 14.502 149.053 13.5381C149.448 12.4865 149.645 11.3035 149.645 9.98912C149.645 8.45567 149.382 7.07556 148.856 5.84873C148.33 4.66573 147.564 3.63616 146.556 2.75987C145.592 1.92739 144.365 1.27015 142.876 0.788221C141.342 0.306296 139.721 0.0652953 138.012 0.0652953H124.079V5.06002H137.552C139.611 5.06002 141.21 5.49818 142.35 6.37443C143.489 7.25067 144.058 8.56504 144.058 10.3176C144.058 11.9387 143.489 13.2093 142.35 14.1294C141.21 15.0934 139.633 15.5753 137.618 15.5753H124.079V31.3482H129.534V20.4384H136.435L144.124 31.3482H150.63L150.631 31.3486ZM161.737 0H155.823L167.258 31.3488H173.239L166.601 12.5526L161.737 0ZM185.922 0H180.139L173.304 16.6931L176.13 24.1853L185.922 0ZM207.413 13.0784V0H201.892V31.4144H207.413V13.0784ZM226.603 0.065615H250V5.06034H226.603V0.065615ZM226.603 26.3538H249.934V31.3486H226.603V26.3538ZM226.603 13.0784H247.699V18.0074H226.603V13.0784Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export const CombinedLogo = ({ className, ...props }: Props) => {
	return (
		<svg
			width="364"
			height="100"
			className={className}
			viewBox="0 0 364 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clip-path="url(#clip0_258_5)">
				<path
					d="M50 100C77.6156 100 100 77.6156 100 50C100 22.3844 77.6156 0 50 0C22.3844 0 0 22.3844 0 50C0 77.6156 22.3844 100 50 100ZM46.3031 20.0656H52.5531V47.8344H80.325V54.0844H46.3031V20.0656ZM27.6812 21.4312H33.9312V66.0656H78.5656V72.3156H27.6812V21.4312Z"
					fill="currentColor"
				/>
				<path
					d="M119.52 48.2786V35.2002H114V66.6146H119.52V48.2786ZM136.805 66.5488H142.26V49.79L136.805 42.1008V66.5491V66.5488ZM158.624 35.2658V56.8876L143.181 35.2658H137.266L159.479 66.549H164.014V35.2658H158.624ZM186.818 40.3922H196.742V35.266H171.374V40.3922H186.818ZM181.298 45.5186H186.818V66.549H181.298V45.5186ZM206.008 35.2658H229.405V40.2605H206.008V35.2658ZM206.008 61.554H229.339V66.5488H206.008V61.554ZM206.008 48.2786H227.104V53.2076H206.008V48.2786ZM264.631 66.5488L256.153 54.7187C257.292 54.3682 258.3 53.952 259.176 53.4701C260.14 52.8567 260.928 52.1776 261.542 51.4328C262.243 50.6004 262.747 49.7022 263.053 48.7382C263.448 47.6867 263.645 46.5037 263.645 45.1893C263.645 43.6559 263.382 42.2758 262.856 41.0489C262.33 39.8659 261.564 38.8364 260.556 37.9601C259.592 37.1276 258.365 36.4703 256.876 35.9884C255.342 35.5065 253.721 35.2655 252.012 35.2655H238.079V40.2602H251.552C253.611 40.2602 255.21 40.6984 256.35 41.5746C257.489 42.4509 258.058 43.7652 258.058 45.5178C258.058 47.1389 257.489 48.4095 256.35 49.3296C255.21 50.2936 253.633 50.7755 251.618 50.7755H238.079V66.5484H243.534V55.6386H250.435L258.124 66.5484H264.63L264.631 66.5488ZM275.737 35.2002H269.823L281.258 66.549H287.239L280.601 47.7528L275.737 35.2002ZM299.922 35.2002H294.139L287.304 51.8933L290.13 59.3855L299.922 35.2002ZM321.413 48.2786V35.2002H315.892V66.6146H321.413V48.2786ZM340.603 35.2658H364V40.2605H340.603V35.2658ZM340.603 61.554H363.934V66.5488H340.603V61.554ZM340.603 48.2786H361.699V53.2076H340.603V48.2786Z"
					fill="currentColor"
				/>
			</g>
			<defs>
				<clipPath id="clip0_258_5">
					<rect width="364" height="100" fill="currentColor" />
				</clipPath>
			</defs>
		</svg>
	);
};