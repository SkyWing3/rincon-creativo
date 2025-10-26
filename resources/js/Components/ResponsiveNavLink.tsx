import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-emerald-400 bg-slate-800 text-emerald-200 focus:border-emerald-400 focus:bg-slate-800 focus:text-emerald-100'
                    : 'border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-100 focus:border-slate-700 focus:bg-slate-900 focus:text-slate-100'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
