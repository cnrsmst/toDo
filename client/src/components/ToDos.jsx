import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const ToDos = ({ setLoggedIn, isLoggedIn }) => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const handleAddTodo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken"); // Tokeni local storage'dan al
      const response = await axios.post(
        `${import.meta.env.VITE_SAVE_TODOS_URL}`,
        { toDo: newTodo },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const newTodoItem = response.data;
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Her istekte tokeni al ve kullan
  const accessToken = localStorage.getItem("accessToken");
  // console.log(accessToken)
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/"); // Kullanıcı giriş yapmamışsa ana sayfaya yönlendir
    } else {
      // Kullanıcı giriş yapmışsa Todos verilerini API'den çekme
      axios
        .get(`${import.meta.env.VITE_GET_TODOS_URL}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.error("Error fetching todos:", error);
        });
    }
  }, [isLoggedIn, navigate]);

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_UPDATE_TODOS_URL}${id}`,
        { completed: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const updatedTodo = response.data;
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = (id) => {
    const accessToken = localStorage.getItem("accessToken"); // Tokeni local storage'dan al
    axios
      .delete(`${import.meta.env.VITE_DELETE_TODOS_URL}${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Silinen todo listesini güncelle
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div className="input-group mb-3 containerDiv">
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
          <button
            className="btn btn-outline-secondary add-button mt-2 add-btn"
            title="Add To Do"
            onClick={handleAddTodo}
            type="button"
          >
            Add
          </button>
        </div>

        <div className="paper w-100 mt-3">
          <div className="lines">
            <div>
              <strong>Todo List</strong>
              <ul style={{ display: todos.length === 0 ? "none" : "block" }}>
                {todos.map((todo) => (
                  <li
                    key={todo._id}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    <div>{todo.toDo}</div>
                    <div>
                      <FontAwesomeIcon
                        icon={todo.completed ? faCheckCircle : faCircle}
                        title="Complete This To Do"
                        className="complete-icon"
                        size="lg"
                        onClick={() =>
                          handleToggleComplete(todo._id, todo.completed)
                        }
                        style={{
                          fontSize: "15px",
                          marginRight: "10px",
                          cursor: "pointer",
                          border: "2px solid black",
                          borderRadius: "50%",
                          color: todo.completed ? "black" : "white",
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        title="Delete This To Do"
                        className="trash-icon"
                        onClick={() => handleDelete(todo._id)}
                        size="lg"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="holes">
            <div className="hole"></div>
            <div className="hole"></div>
            <div className="hole"></div>
          </div>
        </div>
        <button
          className="mt-3 p-1 logout-button w-100"
          title="Logout"
          onClick={handleLogout}
        >
          Çıkış Yap
        </button>
      </div>
    </>
  );
};

export default ToDos;
