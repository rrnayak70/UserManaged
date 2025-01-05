import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_serverUrl;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (editingUser) {
            setEmail(editingUser.email);
            setIsEditing(true);
        } else {
            setEmail('');
            setIsEditing(false);
        }
    }, [editingUser]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users`, {
                headers: { Authorization: `${localStorage.getItem('token')}` },
            });
            setUsers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            // Update user
            try {
                await axios.put(`${apiUrl}/users/${editingUser._id}`, { email, password }, {
                    headers: { Authorization: `${localStorage.getItem('token')}` },
                });
                setEditingUser(null);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        } else {
            // Create user
            try {
                await axios.post(`${apiUrl}/register`, { email, password });
            } catch (error) {
                console.error('Error creating user:', error);
            }
        }
        setEmail('');
        setPassword('');
        fetchUsers();
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setEmail(user.email);
        setPassword(''); // Do not pre-fill password for security reasons
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/users/${id}`, {
                headers: { Authorization: `${localStorage.getItem('token')}` },
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-lg font-bold mb-4">User List</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-2 w-full"
                    required
                    disabled={isEditing}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    {editingUser ? 'Update User' : 'Create User'}
                </button>
            </form>
            {Array.isArray(users) && users.length > 0 ? (
                <table className="min-w-full bg-cyan-800 border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users available</p>
            )}
        </div>
    );
};

export default UserList;
