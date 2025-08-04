import React, { useState, useEffect } from "react";
import { Plus, Circle } from "lucide-react";
import FilterButtons from "./FilterButtons.jsx";
import TodoList from "./TodoList.jsx";
import TodoStats from "./TodoStats.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import InputSection from "./InputSection.jsx";
import Header from "./Header.jsx";
import ClearAllButton from "./ClearAllButton.jsx";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Replace 'your-username' with your actual username
  const username = 'markcus'; // CHANGE THIS TO YOUR USERNAME
  const apiUrl = `https://playground.4geeks.com/todo`;

  // Create user if doesn't exist
  const createUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        console.log('User created successfully');
      } else if (response.status === 400) {
        console.log('User already exists');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user');
    }
  };

  // Load todos from API
  const loadTodos = async () => {
    if (!initialLoading) {
      setLoading(true);
    }
    setError('');
    
    try {
      const response = await fetch(`${apiUrl}/users/${username}`);
      
      if (response.ok) {
        const data = await response.json();
        // Transform API data to match your component structure
        const transformedTodos = (data.todos || []).map(todo => ({
          id: todo.id,
          text: todo.label,
          completed: todo.is_done
        }));
        setTodos(transformedTodos);
      } else if (response.status === 404) {
        // User doesn't exist, create it
        await createUser();
        setTodos([]);
      } else {
        throw new Error('Failed to load todos');
      }
    } catch (error) {
      setError('Error loading todos: ' + error.message);
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (inputValue.trim() === "") return;
    
    const newTodo = {
      label: inputValue.trim(),
      is_done: false
    };

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/todos/${username}`, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setInputValue("");
        await loadTodos(); // Reload the list
      } else {
        throw new Error('Failed to add todo');
      }
    } catch (error) {
      setError('Error adding todo: ' + error.message);
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadTodos(); // Reload the list
      } else {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      setError('Error deleting todo: ' + error.message);
      console.error('Error deleting todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion
  const toggleComplete = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodo = {
      label: todo.text,
      is_done: !todo.completed
    };

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await loadTodos(); // Reload the list
      } else {
        throw new Error('Failed to update todo');
      }
    } catch (error) {
      setError('Error updating todo: ' + error.message);
      console.error('Error updating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Clear all todos (bonus feature)
  const clearAllTodos = async () => {
    if (todos.length === 0) return;
    
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setLoading(true);
      try {
        // Delete all todos one by one
        for (const todo of todos) {
          await fetch(`${apiUrl}/todos/${todo.id}`, {
            method: 'DELETE'
          });
        }
        await loadTodos(); // Reload the list
      } catch (error) {
        setError('Error clearing todos: ' + error.message);
        console.error('Error clearing todos:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  // Load todos when component mounts
  useEffect(() => {
    loadTodos();
  }, []);

  // Show initial loading state
  if (initialLoading) {
    return (
      <div className="app-container">
        <div className="main-content">
          <Header loading={false} />
          <div className="empty-state">
            <div className="empty-icon">
              <Circle size={32} strokeWidth={1.5} />
            </div>
            <h3>Loading your tasks...</h3>
            <p>Please wait while we sync with the server</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Header */}
        <Header loading={loading} />

        {/* Error Message */}
        <ErrorMessage error={error} onDismiss={() => setError('')} />

        {/* Input Section */}
        <InputSection
          inputValue={inputValue}
          onInputChange={setInputValue}
          onKeyPress={handleKeyPress}
          onAddTodo={addTodo}
          loading={loading}
        />

        {/* Filter Buttons */}
        {todos.length > 0 && (
          <FilterButtons
            currentFilter={filter}
            onFilterChange={setFilter}
            todos={todos}
          />
        )}

        {/* Clear All Button (when there are todos) */}
        {todos.length > 0 && (
          <ClearAllButton
            onClearAll={clearAllTodos}
            loading={loading}
            todoCount={todos.length}
          />
        )}

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
        />

        {/* Empty Filter State */}
        {todos.length > 0 && filteredTodos.length === 0 && (
          <div className="empty-filter-state">
            <div className="empty-filter-icon">
              <Circle size={24} strokeWidth={1.5} />
            </div>
            <h3>No {filter} tasks</h3>
            <p>Try switching to a different filter</p>
          </div>
        )}

        {/* Statistics */}
        <TodoStats todos={todos} />
      </div>

      {/* Add loading spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;