import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);
      
      // Construir parámetros de la URL
      const params = new URLSearchParams();
      if (page > 1) params.append('page', page);
      if (search.trim()) params.append('search', search.trim());
      
      const url = `/api/user/table${params.toString() ? '?' + params.toString() : ''}`;
      const response = await axios.get(url);
      console.log('Backend response:', response.data);

      // Extraer los datos de usuarios de la respuesta paginada
      const usersData = response.data.users.data;
      setUsers(usersData);
      setPagination(response.data.users);
      setCurrentPage(page);
      setSearchTerm(search);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = () => {
    fetchUsers(currentPage, searchTerm);
  };

  const goToPage = (page) => {
    fetchUsers(page, searchTerm);
  };

  const searchUsers = (search) => {
    fetchUsers(1, search); // Reiniciar a página 1 cuando se busca
  };

  const addUser = (newUser) => {
    // Agregar el nuevo usuario al principio de la lista
    setUsers(prevUsers => [newUser, ...prevUsers]);
    
    // Actualizar pagination si existe
    if (pagination) {
      setPagination(prevPagination => ({
        ...prevPagination,
        total: prevPagination.total + 1
      }));
    }
  };

  const updateUser = (updatedUser) => {
    // Actualizar el usuario en la lista
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.dni === updatedUser.dni ? updatedUser : user
      )
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    pagination,
    currentPage,
    searchTerm,
    refreshUsers,
    addUser,
    updateUser,
    goToPage,
    searchUsers
  };
};
