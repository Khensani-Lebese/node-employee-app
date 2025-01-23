import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EmployeeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    idNumber: '',
    role: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    startDate: '',
    photo: null,
  });
  useEffect(() => {
    const form = new FormData();
    form.append('name', 'Vee')
    form.append('age', 40)
    console.log(form);


    
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      setFormData({ ...formData, photo: file }); // Store the file object
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('surname', formData.surname);
      data.append('age', formData.age);
      data.append('idNumber', formData.idNumber);
      data.append('role', formData.role);
      data.append('email', formData.email);
      data.append('position', formData.position);
      data.append('department', formData.department);
      data.append('phone', formData.phone);
      data.append('startDate', formData.startDate);
      data.append('photo', formData.photo);
      console.log(formData);  // Attach the photo

      // Make API call to add the employee
      const response = await axios.post('http://localhost:5000/employees/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert('Employee has been added successfully!');
        
        // Reset form fields
        setFormData({
          name: '',
          surname: '',
          age: '',
          idNumber: '',
          role: '',
          email: '',
          position: '',
          department: '',
          phone: '',
          startDate: '',
          photo: null,
        });
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee, please try again.');
    }
};


  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name:
        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
      </Label>
      <Label>
        Surname:
        <Input type="text" name="surname" value={formData.surname} onChange={handleChange} />
      </Label>
      <Label>
        Age:
        <Input type="text" name="age" value={formData.age} onChange={handleChange} />
      </Label>
      <Label>
        Identity Number:
        <Input type="number" name="idNumber" value={formData.idNumber} onChange={handleChange} />
      </Label>
      <Label>
        Email:
        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
      </Label>
      <Label>
        Role:
        <Input type="text" name="role" value={formData.role} onChange={handleChange} />
      </Label>
      <Label>
        Position:
        <Input type="text" name="position" value={formData.position} onChange={handleChange} />
      </Label>
      <Label>
        Department:
        <Input type="text" name="department" value={formData.department} onChange={handleChange} />
      </Label>
      <Label>
        Phone:
        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </Label>
      <Label>
        Start Date:
        <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
      </Label>
      <Label>
        Picture:
        <Input type="file" accept="image/*" onChange={handleImageChange} />
      </Label>
      {formData.photo && <ImagePreview src={formData.photo} alt="Employee Preview" />}
      <Button type="submit">Add Employee</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.label`
  margin-bottom: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 3px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #218838;
  }
`;

const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  border-radius: 5px;
`;

export default EmployeeForm;
