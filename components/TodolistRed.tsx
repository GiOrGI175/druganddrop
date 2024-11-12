'use client';

import { useState, useEffect } from 'react';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodolistRed() {
  const [value, setValue] = useState<string>('');
  const [valuesArray, setValuesArray] = useState<Task[]>([]);

  useEffect(() => {
    const localStorageValue = localStorage.getItem('valueArray3');
    if (localStorageValue) {
      try {
        const parsedValue: Task[] = JSON.parse(localStorageValue);
        setValuesArray(parsedValue);
      } catch (error) {
        console.error('Failed to parse tasks from localStorage:', error);
      }
    }
  }, []);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSetValue = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (value.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: value,
        completed: false,
      };
      setValuesArray((prev) => {
        const newValuesArray = [...prev, newTask];
        localStorage.setItem('valueArray3', JSON.stringify(newValuesArray));
        return newValuesArray;
      });
      setValue('');
    }
  };
  const toggleCompletion = (id: string) => {
    setValuesArray((prev) => {
      const newValuesArray = prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem('valueArray3', JSON.stringify(newValuesArray));
      return newValuesArray;
    });
  };

  const handleDelateTask = (id: string) => {
    setValuesArray((prev) => prev.filter((el) => el.id !== id));
  };

  const handleDeleteAll = (): void => {
    setValuesArray([]);
    localStorage.removeItem('valueArray3');
  };

  const handleDownload = (): void => {
    const dataString = valuesArray.map((task) => task.text).join('\n');
    const a = document.createElement('a');
    const file = new Blob([dataString], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'tasks.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className=' bg-red-200 p-4'>
      <div className='mb-4'>
        <button
          onClick={handleDeleteAll}
          className='mr-4 p-2 bg-red-500 text-white rounded hover:bg-red-600'
        >
          Delete All
        </button>
        <button
          onClick={handleDownload}
          className='p-2 bg-green-500 text-white rounded hover:bg-green-600'
        >
          Download
        </button>
      </div>
      <form onSubmit={handleSetValue} className='flex mb-4'>
        <input
          type='text'
          value={value}
          onChange={handleValue}
          placeholder='Add a new task'
          className='border p-2 flex-1 rounded mr-2'
        />
        <button
          type='submit'
          className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Add
        </button>
      </form>
      <div>
        <ul>
          {valuesArray.map((task) => (
            <div key={task.id} className='flex justify-between mb-[10px]'>
              <li className='flex items-center mb-2'>
                <input
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className='mr-2'
                />
                <span
                  className={task.completed ? 'line-through text-gray-500' : ''}
                >
                  {task.text}
                </span>
              </li>
              <button
                onClick={() => handleDelateTask(task.id)}
                className='p-2 bg-red-500 text-white rounded hover:bg-red-600'
              >
                delate
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
