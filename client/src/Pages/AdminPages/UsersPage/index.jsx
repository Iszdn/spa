import React, { useEffect, useState } from 'react';
import "./index.scss";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedRole, setEditedRole] = useState('');
  const [editUserId, setEditUserId] = useState('');
  const [loading, setLoading] = useState(true)

  async function getData() {
    const res = await axios("http://localhost:5000/users/all");
    setData(res.data);
    setLoading(false)
  }

  async function deleteUser(id) {
    const res = await axios.delete(`http://localhost:5000/users/${id}`);
    getData();
  }

  async function updateUserRole() {
    await axios.put(`http://localhost:5000/users/${editUserId}`, { role: editedRole });
    getData();
    setShowModal(false); 
  }

  useEffect(() => {
    getData();
  }, []);

  const openEditModal = (id, role) => {
   setShowModal(true);
    setEditUserId(id);
    setEditedRole(role);
    
  };

  return (
    <>
      <Helmet>
        <title>UsersPage</title>
      </Helmet>
      <div className="adminpage">
        <div className="userpage">
          <div className="usertable">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>email</th>
                    <th>role</th>
                    <th>settings</th>
                  </tr>
                </thead>
                <tbody>
                  {
                   loading ? <span>loading...</span> :
        
                   (
                  data && data.map(user => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button onClick={() => deleteUser(user._id)} className='btn'><AiOutlineDelete /></button>
                        <button onClick={() => openEditModal(user._id, user.role)} className='btn'><CiEdit /></button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>
<div className="addUser">
<button className='btn'><Link to="/admin/adduser">add user</Link></button>
</div>
        </div>
      </div>
      {

      showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Edit User Role</h2>
            <input
              type="text"
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
              placeholder="Enter new role"
            />
            <div className="di">
            <button className='btn' onClick={updateUserRole}>Save</button>

            </div>
          </div>
        </div>
      )}

    </>
  );
}


export default UsersPage;
