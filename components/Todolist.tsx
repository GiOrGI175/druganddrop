'use client';

import { useState } from 'react';

export default function Todolist() {
  const [value, setValue] = useState('');
  const [valuesArray, setValuesArray] = useState<string[]>([]);

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSetValue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim()) {
      setValuesArray((prev) => [...prev, value]);
      setValue('');
    }
  };

  const handleDeleteAll = () => {
    setValuesArray([]);
  };

  return (
    <div>
      <div className='w-[500px] h-[500px] bg-yellow-200'>
        <div>
          <button onClick={handleDeleteAll}>Delete All</button>
          <button>Download</button>
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
            {valuesArray.map((value, index) => (
              <li key={index}>
                <div>
                  <input type='checkbox' checked />
                </div>

                {value}
                <div>delate</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
