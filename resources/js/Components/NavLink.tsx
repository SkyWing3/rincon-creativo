import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-emerald-400 text-emerald-200'
                    : 'border-transparent text-slate-400 hover:border-slate-600 hover:text-slate-100 focus:border-slate-600 focus:text-slate-100') +
                ` ${className}`
            }
        >
            {children}
        </Link>
    );
}
