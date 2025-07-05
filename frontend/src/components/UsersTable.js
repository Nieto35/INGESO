import React, { useState } from 'react';

const UsersTable = ({ users, pagination, loading, error, onAddUser, onEditUser, onSearch, onPageChange, currentPage, searchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    onSearch('');
  };
  if (loading) {
    return (
      <div className="mt-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-sm text-gray-500">Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de usuarios
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={onAddUser}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Agregar usuario
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="mt-6">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 items-center">
          <div className="w-64">
            <label htmlFor="search" className="sr-only">
              Buscar usuarios
            </label>
            <input
              type="text"
              id="search"
              value={localSearchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre, DNI, email o teléfono..."
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Buscar
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Limpiar
            </button>
          )}
        </form>
      </div>

      <div className="mt-8 flow-root">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 24c4.21 0 7.863 2.613 9.288 6.286" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza agregando un nuevo usuario.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        DNI
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Teléfono
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Fecha Nacimiento
                      </th>
                      <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((user, index) => (
                      <tr key={user.email || user.id || index}>
                        <td className="py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
                          <div className="flex items-center">
                            <div className="size-11 shrink-0">
                              <img 
                                alt="" 
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name || 'User')}&backgroundColor=3b82f6,6366f1,8b5cf6,a855f7,ec4899,ef4444,f97316,f59e0b,eab308,84cc16,22c55e,10b981,06b6d4,0ea5e9,3b82f6`}
                                className="size-11 rounded-full" 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="mt-1 text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                          <div className="text-gray-900">{user.dni}</div>
                        </td>
                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                          <div className="text-gray-900">{user.phone}</div>
                        </td>
                        <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                          <div className="text-gray-900">{user.birth_date}</div>
                        </td>
                        <td className="relative py-5 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                          <button 
                            onClick={() => onEditUser(user)}
                            className="text-orange-600 hover:text-orange-900 font-medium"
                          >
                            Editar<span className="sr-only">, {user.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Información de paginación y controles */}
            {pagination && (
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= pagination.last_page}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{pagination.from || 0}</span> a{' '}
                      <span className="font-medium">{pagination.to || 0}</span> de{' '}
                      <span className="font-medium">{pagination.total}</span> usuarios
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Anterior</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Números de página */}
                      {generatePageNumbers(currentPage, pagination.last_page).map((pageNum, index) => (
                        pageNum === '...' ? (
                          <span key={index} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                            ...
                          </span>
                        ) : (
                          <button
                            key={index}
                            onClick={() => onPageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                              pageNum === currentPage
                                ? 'bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                : 'text-gray-900'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      ))}
                      
                      <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= pagination.last_page}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Siguiente</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Función helper para generar números de página con elipsis
const generatePageNumbers = (currentPage, lastPage) => {
  const pages = [];
  const delta = 2; // Número de páginas a mostrar antes y después de la actual
  
  // Siempre mostrar primera página
  pages.push(1);
  
  // Si hay espacio entre 1 y el rango actual, agregar elipsis
  if (currentPage - delta > 2) {
    pages.push('...');
  }
  
  // Páginas alrededor de la actual
  for (let i = Math.max(2, currentPage - delta); i <= Math.min(lastPage - 1, currentPage + delta); i++) {
    pages.push(i);
  }
  
  // Si hay espacio entre el rango actual y la última página, agregar elipsis
  if (currentPage + delta < lastPage - 1) {
    pages.push('...');
  }
  
  // Siempre mostrar última página (si no es la primera)
  if (lastPage > 1) {
    pages.push(lastPage);
  }
  
  return pages;
};

export default UsersTable;
