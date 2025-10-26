import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-slate-700 text-emerald-500 shadow-sm focus:ring-emerald-500 focus:ring-offset-slate-950 bg-slate-900 ' +
                className
            }
        />
    );
}
