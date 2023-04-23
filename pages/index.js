import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function Home() {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');

  async function addTodo() {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text: input, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setInput('');
      setDescription('');
      toast.success('ToDo added successfully!');
    } else {
      toast.error('Failed to add ToDo.');
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <ToastContainer />
      <div className="max-w-lg mx-auto py-10 px-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-6">ToDo App</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Task title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Task description"
          rows="4"
        />
        <button
          onClick={addTodo}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
        >
          Add ToDo
        </button>
        
      </div>
    </div>
  );
}
