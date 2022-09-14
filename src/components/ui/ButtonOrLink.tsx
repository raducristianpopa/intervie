import { ComponentProps, forwardRef } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

type ButtonOrLinkProps = ComponentProps<'button'> & ComponentProps<'a'>;

export interface Props extends ButtonOrLinkProps {
	// If the link should preserve the `redirect` parameter, set this to `true`.
	preserveRedirect?: boolean;
}

/**
 * This is a base component that will render either a button or a link,
 * depending on the props that are passed to it. The link rendered will
 * also correctly get wrapped in a next/link component to ensure ideal
 * page-to-page transitions.
 */
export const ButtonOrLink = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
	({ href, preserveRedirect, ...props }, ref: any) => {
		const router = useRouter();
		const isLink = typeof href !== 'undefined';

		if (isLink) {
			const finalHref =
				preserveRedirect && router.query.redirect
					? `${href!}?redirect=${encodeURIComponent(router.query.redirect as string)}`
					: href!;

			return (
				<Link href={finalHref}>
					<a ref={ref} {...props} />
				</Link>
			);
		}

		return <button {...props} type={props.type || 'button'} ref={ref} />;
	}
);
