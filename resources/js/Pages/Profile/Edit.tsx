import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string | null | undefined}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-100">
                    Mi Perfil
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* CAMBIO: Aumenté el ancho máximo a max-w-4xl solo en este bloque para que quepan la foto y los datos */}
                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status ?? undefined}
                            className="max-w-4xl" 
                        />
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-xl sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
