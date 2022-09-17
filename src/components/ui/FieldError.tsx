import { useFormContext } from 'react-hook-form';

interface FieldErrorProps {
	name?: string;
}

const FieldError = ({ name }: FieldErrorProps) => {
	const {
		formState: { errors }
	} = useFormContext();

	if (!name) return null;

	const error = errors[name];
	if (!error) return null;

	return <div className="text-sm font-medium text-red-500">{error.message as string}</div>;
};

export default FieldError;
