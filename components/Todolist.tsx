'use client';

import { useState, useEffect } from 'react';

export default function Todolist() {
  const [value, setValue] = useState('');
  const [valuesArray, setValuesArray] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const localStorageValue = JSON.parse(
      localStorage.getItem('valueArray') || '[]'
    );
    if (localStorageValue) {
      setValuesArray(localStorageValue);
    }
  }, []);

  const handleSetValue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim()) {
      setValuesArray((prev) => {
        const updatedArray = [...prev, value];
        localStorage.setItem('valueArray', JSON.stringify(updatedArray));
        return updatedArray;
      });
      setValue('');
    }
  };
  const handleDelete = (index: number) => {
    setValuesArray((prev) => {
      const updatedArray = prev.filter((_, i) => i !== index);
      localStorage.setItem('valueArray', JSON.stringify(updatedArray));
      return updatedArray;
    });
  };

  const handleDeleteAll = () => {
    setValuesArray([]);
    localStorage.removeItem('valueArray');
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(valuesArray, null, 2)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'todos.json';
    link.click();
  };

  return (
    <div>
      <div className='w-[500px] h-[500px] bg-yellow-200'>
        <div>
          <button onClick={handleDeleteAll}>Delete All</button>
          <button onClick={download}>Download</button>
        </div>
        <form onSubmit={handleSetValue}>
          <div>
            <input
              type='text'
              placeholder='Add a new task'
              value={value}
              onChange={handleValue}
            />
            <button type='submit'>Add</button>
          </div>
        </form>
        <div>
          <ul>
            {valuesArray.map((task, index) => (
              <li key={index}>
                <div className='flex justify-between'>
                  <div className='block'>
                    <input
                      type='checkbox'
                      checked={checked}
                      onChange={handleChange}
                    />
                  </div>
                  {task}
                  <div>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
