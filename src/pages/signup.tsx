import SignUpForm from '@components/Auth/SignUpForm';

const Header: React.FC<{}> = () => {
	return (
		<div className="text-black">
			<SignUpForm />
		</div>
	);
};

export default Header;
