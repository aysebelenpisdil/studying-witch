'use client';

import React, { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoListProps {
  onTaskComplete: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({ onTaskComplete }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Finish math homework', completed: false, createdAt: new Date() },
    { id: '2', text: 'Read chapter 5', completed: true, createdAt: new Date() },
    { id: '3', text: 'Practice piano for 30 minutes', completed: false, createdAt: new Date() }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updated = { ...todo, completed: !todo.completed };
        // Trigger spell animation when task is completed
        if (updated.completed && !todo.completed) {
          onTaskComplete();
        }
        return updated;
      }
      return todo;
    }));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="bg-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 h-fit">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          📋 <span>Magical Tasks</span>
        </h2>
        <div className="text-purple-200 text-sm">
          {completedCount} of {totalCount} spells cast ✨
        </div>
        {/* Progress bar */}
        <div className="w-full bg-purple-900/50 rounded-full h-2 mt-3">
          <div 
            className="bg-purple-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Add new todo */}
      <form onSubmit={addTodo} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new magical task..."
            className="flex-1 bg-purple-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            ✨ <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </form>

      {/* Todo list */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-purple-300">
            <div className="text-4xl mb-2">🧙‍♀️</div>
            <p>No magical tasks yet!</p>
            <p className="text-sm mt-1">Add your first task above</p>
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                todo.completed
                  ? 'bg-green-900/30 border-green-500/30 text-green-100'
                  : 'bg-purple-900/30 border-purple-500/20 text-white hover:bg-purple-800/40'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-purple-400 hover:bg-purple-500/20'
                }`}
              >
                {todo.completed && '✓'}
              </button>
              
              <span className={`flex-1 ${todo.completed ? 'line-through opacity-75' : ''}`}>
                {todo.text}
              </span>
              
              {todo.completed && <span className="text-yellow-300 text-lg">✨</span>}
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer stats */}
      {todos.length > 0 && (
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <div className="flex justify-between text-sm text-purple-300">
            <span>{todos.filter(t => !t.completed).length} remaining</span>
            {completedCount > 0 && (
              <span className="text-green-300">{completedCount} completed ✨</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};