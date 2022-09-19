import { useFormContext } from 'react-hook-form';

export interface FieldErrorProps {
	name?: string;
}

const FieldError = ({ name }: FieldErrorProps) => {
	const {
		formState: { errors }
	} = useFormContext();

	if (!name) return null;

	const error = errors[name];
	if (!error) return null;

	return <div className="my-1 text-sm font-medium text-red-600">{error.message as string}</div>;
};

export default FieldError;
