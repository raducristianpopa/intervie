import { ComponentProps } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	UseFormProps,
	UseFormReturn,
	useForm
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { TypeOf, ZodSchema } from 'zod';

import { CodedError, ZodError, ZodFieldError } from '~/__generated__/schema.generated';

interface UseZodFormProps<T extends ZodSchema<any>> extends UseFormProps<TypeOf<T>> {
	schema: T;
}

interface FormProps<T extends FieldValues = any> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
	small?: boolean;
}

export const useZodForm = <T extends ZodSchema<any>>({
	schema,
	...formConfig
}: UseZodFormProps<T>) => {
	return useForm({
		...formConfig,
		mode: 'onBlur',
		resolver: zodResolver(schema)
	});
};

export const Form = <T extends FieldValues>({
	form,
	onSubmit,
	children,
	small,
	...props
}: FormProps<T>) => {
	// This is a custom submit handler so we will not have to do the same operations
	// for every form we create. Basically, we will check for different type of errors
	// that we defined in our GraphQL schema and we will handle them in different ways.
	// This is not 100% typesafe, but it's a workaround. (surely there is a better way if doing this)
	const submitHandler: SubmitHandler<T> = async (values) => {
		const { data } = await onSubmit(values);
		try {
			if (typeof data === 'object') {
				// We get the operation name (the query/mutation name)
				const operationName = Object.keys(data)[0];
				const res = data[operationName];

				// We check for different typenames so we can handle them in different ways.
				if (res.__typename === 'CodedError') {
					const codedErrorRes: CodedError = res;
					if (codedErrorRes.validation && Object.keys(codedErrorRes.validation).length) {
						form.setError(codedErrorRes.validation.path, {
							type: 'custom',
							message: codedErrorRes.validation.message
						});
					} else {
						toast.error(codedErrorRes.message);
					}
				}

				if (res.__typename === 'ZodError') {
					const zodErrorRes: ZodError = res;
					if (zodErrorRes.errors) {
						zodErrorRes.errors.map((error) => {
							if (error.__typename === 'ZodFieldError') {
								form.setError(error.path[1] as any, {
									type: 'custom',
									message: error.message
								});
							}
						});
					}
				}
			}
		} catch (e) {
			console.warn('Error while attempting to extract GraphQL errors.');
			console.warn(e);
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)} {...props}>
				<fieldset
					className={(clsx('flex flex-col'), small ? '' : 'space-y-4')}
					disabled={form.formState.isSubmitting}
				>
					{children}
				</fieldset>
			</form>
		</FormProvider>
	);
};
