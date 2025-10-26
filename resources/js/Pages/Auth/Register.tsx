import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        f_last_name: '',
        s_last_name: '',
        email: '',
        phone: '',
        departamento: '',
        city: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    const departamentos = [
        { value: 'La Paz', label: 'La Paz' },
        { value: 'Cochabamba', label: 'Cochabamba' },
        { value: 'Santa Cruz', label: 'Santa Cruz' },
        { value: 'Oruro', label: 'Oruro' },
        { value: 'Potosi', label: 'Potosí' }, // <--- Nota: Value sin tilde (según tu Enum), Label con tilde
        { value: 'Chuquisaca', label: 'Chuquisaca' },
        { value: 'Tarija', label: 'Tarija' },
        { value: 'Beni', label: 'Beni' },
        { value: 'Pando', label: 'Pando' },
    ];


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registro de Usuario" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="first_name" value="Nombres" />
                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="given-name"
                        isFocused={true}
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.first_name} className="mt-2" />
                </div>
                {/* Apellidos en 2 columnas */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="f_last_name" value="Apellido Paterno" />
                        <TextInput
                            id="f_last_name"
                            name="f_last_name"
                            value={data.f_last_name}
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={(e) => setData('f_last_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.f_last_name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="s_last_name" value="Apellido Materno" />
                        <TextInput
                            id="s_last_name"
                            name="s_last_name"
                            value={data.s_last_name}
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={(e) => setData('s_last_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.s_last_name} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Teléfono */}
                    <div>
                        <InputLabel htmlFor="phone" value="Teléfono / Celular" />
                        <TextInput
                            id="phone"
                            name="phone"
                            type="tel"
                            value={data.phone}
                            className="mt-1 block w-full"
                            placeholder="Ej: 70012345"
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                    <InputError message={errors.phone} className="mt-2" />
                    </div>

                    {/* Departamento (Select Manual) */}
                    <div>
                        <InputLabel htmlFor="departamento" value="Departamento" />
                        <select
                            id="departamento"
                            name="departamento"
                            value={data.departamento}
                            className="mt-1 block w-full rounded-md border border-slate-800 bg-slate-900 text-slate-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
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
                        <InputError message={errors.departamento} className="mt-2" />
                    </div>
                </div>


                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ciudad */}
                    <div className="md:col-span-2">
                        <InputLabel htmlFor="city" value="Ciudad" />
                        <TextInput
                            id="city"
                            name="city"
                            value={data.city}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('city', e.target.value)}
                            required
                        />
                        <InputError message={errors.city} className="mt-2" />
                    </div>
                </div>
                {/* Dirección */}
                <div className="mt-4">
                    <InputLabel htmlFor="address" value="Dirección Domiciliaria" />
                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        placeholder="Av. Principal #123, Zona Central..."
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />
                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo Electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* --- SECCIÓN: Seguridad --- */}
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="password" value="Contraseña" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>
                
                {/* Botones */}
                <div className="mt-6 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-emerald-300 underline hover:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        ¿Ya tienes cuenta?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Registrarse
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
