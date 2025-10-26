import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, FormEvent } from 'react';

type UpdateProfileInformationFormProps = {
    mustVerifyEmail: boolean;
    status?: string | null;
    className?: string;
};

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = '',
}: UpdateProfileInformationFormProps) {
    const user = usePage().props.auth.user ?? ({} as any);
    const [showPhotoOptions, setShowPhotoOptions] = useState(false);

    // Inicializamos el formulario con TODOS los datos del usuario
    const form = useForm({
        first_name: user.first_name || '',
        f_last_name: user.f_last_name || '',
        s_last_name: user.s_last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        departamento: user.departamento || '',
        city: user.city || '',
        address: user.address || '',
        photo_url: user.photo_url || '',
    });

    const { data, setData, errors, processing, recentlySuccessful } = form;

    // Mismo array de departamentos para mantener consistencia
    const departamentos = [
        { value: 'La Paz', label: 'La Paz' },
        { value: 'Cochabamba', label: 'Cochabamba' },
        { value: 'Santa Cruz', label: 'Santa Cruz' },
        { value: 'Oruro', label: 'Oruro' },
        { value: 'Potosi', label: 'Potosí' },
        { value: 'Chuquisaca', label: 'Chuquisaca' },
        { value: 'Tarija', label: 'Tarija' },
        { value: 'Beni', label: 'Beni' },
        { value: 'Pando', label: 'Pando' },
    ];

    const presetPhotos = [
        {
            label: 'Creativo',
            url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        },
        {
            label: 'Minimalista',
            url: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80',
        },
        {
            label: 'Ilustración',
            url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
        },
        {
            label: 'Retrato',
            url: 'https://images.unsplash.com/photo-1542327897-37fa1ff59c07?auto=format&fit=crop&w=300&q=80',
        },
    ];

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        form.transform((formData) => ({
            ...formData,
            photo_url: formData.photo_url?.trim()
                ? formData.photo_url.trim()
                : null,
        }));

        form.patch(route('profile.update'));
    };

    const handlePhotoSelect = (url: string) => {
        setData('photo_url', url);
        setShowPhotoOptions(false);
    };

    return (
        <section className={`space-y-4 text-slate-100 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-slate-100">
                    Información del Perfil
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                    Actualiza la información de tu cuenta y tu dirección de correo.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6">
                
                {/* GRID PRINCIPAL: 2 COLUMNAS (Datos vs Foto) */}
                <div className="flex flex-col-reverse md:flex-row gap-8">
                    
                    {/* COLUMNA IZQUIERDA: LOS INPUTS (70% del ancho) */}
                    <div className="flex-1 space-y-6">
                        
                        {/* Nombres */}
                        <div>
                            <InputLabel htmlFor="first_name" value="Nombres" />
                            <TextInput
                                id="first_name"
                                className="mt-1 block w-full"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                required
                                isFocused
                                autoComplete="given-name"
                            />
                            <InputError className="mt-2" message={errors.first_name} />
                        </div>

                        {/* Apellidos (Grid interno) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="f_last_name" value="Apellido Paterno" />
                                <TextInput
                                    id="f_last_name"
                                    className="mt-1 block w-full"
                                    value={data.f_last_name}
                                    onChange={(e) => setData('f_last_name', e.target.value)}
                                    required
                                    autoComplete="family-name"
                                />
                                <InputError className="mt-2" message={errors.f_last_name} />
                            </div>
                            <div>
                                <InputLabel htmlFor="s_last_name" value="Apellido Materno" />
                                <TextInput
                                    id="s_last_name"
                                    className="mt-1 block w-full"
                                    value={data.s_last_name}
                                    onChange={(e) => setData('s_last_name', e.target.value)}
                                    required
                                    autoComplete="family-name"
                                />
                                <InputError className="mt-2" message={errors.s_last_name} />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Correo Electrónico" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email} />

                            {mustVerifyEmail && user.email_verified_at === null && (
                                <div>
                                    <p className="mt-2 text-sm text-slate-300">
                                        Tu dirección de correo no está verificada.
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="rounded-md text-sm text-emerald-300 underline hover:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                                        >
                                            Haz clic aquí para reenviar el correo de verificación.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-emerald-300">
                                            Se ha enviado un nuevo enlace de verificación a tu correo.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Teléfono y Departamento */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="phone" value="Teléfono" />
                                <TextInput
                                    id="phone"
                                    className="mt-1 block w-full"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.phone} />
                            </div>
                            <div>
                                <InputLabel htmlFor="departamento" value="Departamento" />
                                <select
                                    id="departamento"
                                    className="mt-1 block w-full rounded-md border border-slate-800 bg-slate-900 text-slate-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    value={data.departamento}
                                    onChange={(e) => setData('departamento', e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione...</option>
                                    {departamentos.map((depto) => (
                                        <option key={depto.value} value={depto.value}>
                                            {depto.label}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.departamento} />
                            </div>
                        </div>

                        {/* Ciudad y Dirección */}
                        <div>
                            <InputLabel htmlFor="city" value="Ciudad" />
                            <TextInput
                                id="city"
                                className="mt-1 block w-full"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.city} />
                        </div>
                        <div>
                            <InputLabel htmlFor="address" value="Dirección" />
                            <TextInput
                                id="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.address} />
                        </div>

                        {/* Botón Guardar */}
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Guardar Cambios</PrimaryButton>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-slate-400">
                                    Guardado.
                                </p>
                            </Transition>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: FOTO DE PERFIL (30% del ancho) */}
                    <div className="w-full md:w-1/3 flex flex-col items-center justify-start pt-6">
                        <div className="relative">
                            {/* Marco de la foto */}
                            <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-slate-800 bg-slate-900 shadow-lg ring-2 ring-slate-800">
                                <img
                                    src={
                                        data.photo_url ||
                                        'https://ui-avatars.com/api/?name=' + user.first_name + '&background=random'
                                    }
                                    alt={user.first_name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            
                            <div className="mt-4 flex items-center gap-3">
                                <p className="text-center text-sm font-medium text-slate-400">
                                    Foto de perfil
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowPhotoOptions((prev) => !prev)}
                                    className="rounded-full border border-emerald-500 px-2 py-1 text-xs font-semibold text-emerald-200 hover:bg-slate-800"
                                    aria-expanded={showPhotoOptions}
                                >
                                    Cambiar
                                </button>
                            </div>
                            {showPhotoOptions && (
                                <div className="mt-4 w-64">
                                    <p className="text-xs uppercase tracking-wide text-slate-400">
                                        Selecciona una opción
                                    </p>
                                    <div className="mt-2 grid grid-cols-2 gap-3">
                                        {presetPhotos.map((photo) => (
                                            <button
                                                type="button"
                                                key={photo.url}
                                                onClick={() => handlePhotoSelect(photo.url)}
                                                className="rounded-lg border border-slate-800 p-1 text-left hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                                            >
                                                <img
                                                    src={photo.url}
                                                    alt={photo.label}
                                                    className="h-20 w-full rounded-md object-cover"
                                                />
                                                <span className="mt-1 block text-xs font-medium text-slate-300">
                                                    {photo.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </form>
        </section>
    );
}
