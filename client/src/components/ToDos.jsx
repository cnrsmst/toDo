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
      const response = await axios.post(`${import.meta.env.VITE_SAVE_TODOS_URL}`, { toDo: newTodo });
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
      axios.get(`${import.meta.env.VITE_GET_TODOS_URL}`)
        .then(response => {
          setTodos(response.data);
        })
        .catch(error => {
          console.error('Error fetching todos:', error);
        });
    }
  }, [isLoggedIn, navigate]);

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_DELETE_TODOS_URL}${id}`)
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
        className="form-control w-75 outline-none shadow-none inp-deneme"
        placeholder="Add Your Tasks..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary add-button mt-2 add-btn" title='Add To Do' onClick={handleAddTodo} type="button">
          Add
        </button>
      </div>
      <ul className='list-group list-group-flush w-100 mt-3 p-3 border'>
        {todos.map(todo => (
          <li className='list-group-item d-flex justify-content-between p-3' key={todo._id}>
            <div>
              {todo.toDo}</div>
            <div>
              <FontAwesomeIcon icon={faTrash} title='Delete This To Do' className='trash-icon' onClick={() => handleDelete(todo._id)} size="lg" />
            </div>
          </li>
        ))}
      </ul>
      <button className='mt-3 p-1 logout-button w-100' title='Logout' onClick={handleLogout}>Çıkış Yap</button>
    </div>


    </>
    
  );
};

export default ToDos;
