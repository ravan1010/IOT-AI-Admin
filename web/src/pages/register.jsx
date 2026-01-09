import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', url: '', phoneNo: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/register', formData);
      alert(response.data.msg);
    } catch (err) {
      alert(err.response.data.msg || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} 
        style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: '300px', 
            margin: '0 auto',
            border: '1px solid #ccc',
            paddingInline: '30px',
            paddingBlock: '50px',

         }}
            >
      <input 
        type="text" 
        placeholder="Username" 
        onChange={(e) => setFormData({...formData, username: e.target.value})} 
        style={{
            border: '1px solid black',
            marginBlock: '5px',
            padding: '5px',
            paddingInline: '10px',
            borderRadius: '15px',
        }}
      />
      <input 
        type="text" 
        placeholder="url" 
        onChange={(e) => setFormData({...formData, url: e.target.value})} 
        style={{
            border: '1px solid black',
            marginBlock: '5px',
            padding: '5px',
            paddingInline: '10px',
            borderRadius: '15px',
        }}
      />
      <input 
        type="number" 
        placeholder="Phone Number" 
        onChange={(e) => setFormData({...formData, phoneNo: e.target.value})} 
        style={{
            border: '1px solid black',
            marginBlock: '5px',
            padding: '5px',
            paddingInline: '10px',
            borderRadius: '15px',
        }}
      />
      <button type="submit" style={{
            border: '1px solid black',
            width: '50%',
            marginBlock: '5px',
            padding: '5px',
            paddingInline: '10px',
            borderRadius: '15px',
            marginInline: 'auto',
        }}>Register</button>
    </form>
  );
};



export default Register;