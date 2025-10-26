import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 text-slate-100 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-slate-100">
                    Borrar cuenta
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                   Una vez que su cuenta sea eliminada, todos sus recursos y 
                   datos se eliminarán permanentemente. Antes de eliminar su 
                   cuenta, por favor, descargue cualquier dato o información 
                   que desee conservar.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Borrar cuenta
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-slate-100">
                        Estas seguro de querer borrar tu cuenta?
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Una vez que su cuenta sea eliminada, todos sus recursos 
                        y datos se borrarán permanentemente. Por favor, introduzca 
                        su contraseña para confirmar que desea eliminar su cuenta 
                        de forma permanente.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Borrar cuenta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
