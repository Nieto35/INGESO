import React, { useState } from 'react';
import './App.css';
import UsersTable from './components/UsersTable';
import AddUserModal from './components/AddUserModal';
import EditUserModal from './components/EditUserModal';
import { useUsers } from './hooks/useUsers';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { 
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
  } = useUsers();

  const handleAddUser = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleUserAdded = (newUser) => {
    addUser(newUser);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdated = (updatedUser) => {
    updateUser(updatedUser);
  };

  return (
    <div className="App">
      <UsersTable
        users={users}
        pagination={pagination}
        loading={loading}
        error={error}
        currentPage={currentPage}
        searchTerm={searchTerm}
        onAddUser={handleAddUser}
        onEditUser={handleEditUser}
        onSearch={searchUsers}
        onPageChange={goToPage}
      />
      
      <AddUserModal
        open={modalOpen}
        onClose={handleModalClose}
        onUserAdded={handleUserAdded}
      />

      <EditUserModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        onUserUpdated={handleUserUpdated}
        user={selectedUser}
      />
    </div>
  );
}

export default App;
