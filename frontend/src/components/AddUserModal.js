import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from 'axios';

const AddUserModal = ({ open, onClose, onUserAdded }) => {
    const [formData, setFormData] = useState({
        dni: '',
        name: '',
        email: '',
        birth_date: '',
        phone: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const response = await axios.post('/api/user/create', formData);
            console.log('User created:', response.data);

            // Usar los datos del formulario directamente
            onUserAdded(formData);

            // Resetear formulario
            setFormData({
                dni: '',
                name: '',
                email: '',
                birth_date: '',
                phone: ''
            });

            // Cerrar modal
            onClose();

        } catch (err) {
            console.error('Error creating user:', err);
            setError(err.response?.data?.message || 'Error al crear el usuario');
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setError(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div>
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-indigo-100">
                                <span className="text-2xl">👤</span>
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    Agregar Nuevo Usuario
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Complete los siguientes campos para crear un nuevo usuario.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 rounded-md bg-red-50 p-4">
                                <div className="text-sm text-red-700">{error}</div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                                    DNI
                                </label>
                                <input
                                    type="text"
                                    name="dni"
                                    id="dni"
                                    value={formData.dni}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    placeholder="Ingrese el DNI"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    placeholder="Ingrese el nombre completo"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">
                                    Fecha de Nacimiento
                                </label>
                                <input
                                    type="date"
                                    name="birth_date"
                                    id="birth_date"
                                    value={formData.birth_date}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                                    placeholder="Ingrese el número de teléfono"
                                />
                            </div>

                            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                                >
                                    {submitting ? 'Guardando...' : 'Guardar Usuario'}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default AddUserModal;
