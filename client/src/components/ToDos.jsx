import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ToDos = ({ setLoggedIn , isLoggedIn }) => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState('');
  const handleAddTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/save', { toDo: newTodo });
      const newTodoItem = response.data;
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/'); // Kullanıcı giriş yapmamışsa ana sayfaya yönlendir
    } else {
      // Kullanıcı giriş yapmışsa Todos verilerini API'den çekme
      axios.get('http://localhost:5000/api/get')
        .then(response => {
          setTodos(response.data);
        })
        .catch(error => {
          console.error('Error fetching todos:', error);
        });
    }
  }, [isLoggedIn, navigate]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/delete/${id}`)
      .then(response => {
        // Silinen todo listesini güncelle
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };
  
  const handleLogout = () => {
    setLoggedIn(false); 
    navigate('/'); 
  };

  
  return (
    
    <>
    

<div className="input-group mb-3 w-25">
      <input
        type="text"
        className="form-control w-75 outline-none shadow-none"
        placeholder="Add Your Tasks..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary add-button" onClick={handleAddTodo} type="button">
          Add
        </button>
      </div>
      <ul className='list-group list-group-flush w-100 mt-2'>
        {todos.map(todo => (
          <li className='list-group-item d-flex justify-content-between' key={todo._id}>
            <div>{todo.toDo}</div>
            <div>
              <FontAwesomeIcon icon={faTrash} className='trash-icon' onClick={() => handleDelete(todo._id)} size="lg" />
            </div>
          </li>
        ))}
        <button className='mt-3 p-1 logout-button' onClick={handleLogout}>Çıkış Yap</button>
      </ul>
    </div>


    </>
    
  );
};

export default ToDos;
