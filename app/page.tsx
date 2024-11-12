'use client';

import { useState } from 'react';
import Todolist from '@/components/todolist';
import todolitsGreen from '@/components/todolitsGreen';
export default function Home() {
  const [showdivList, setShowdivList] = useState(false);

  const [showTodoYelow, setShowTolistYelow] = useState(false);
  const [showTodoGreen, setShowTolistGreen] = useState(false);
  const [showTodoBlue, setShowTolistBlue] = useState(false);
  const [showTodoRed, setShowTolistRed] = useState(false);

  return (
    <>
      <div>
        {showTodoYelow && <Todolist />}
        {showTodoRed && <todolitsGreen />}
      </div>
      <div className='min-h-screen flex justify-end items-end'>
        <div className='flex flex-col items-end gap-3'>
          {showdivList && (
            <div className='flex flex-col gap-3 border-[1px] bg-slate-500 rounded-[20px]'>
              <button
                className='w-[50px] h-[50px] rounded-full bg-yellow-300'
                onClick={() => setShowTolistYelow((perv) => !perv)}
              ></button>
              <button
                className='w-[50px] h-[50px] rounded-full bg-green-700'
                onClick={() => setShowTolistGreen((perv) => !perv)}
              ></button>
              <button
                className='w-[50px] h-[50px] rounded-full bg-blue-500'
                onClick={() => setShowTolistBlue((perv) => !perv)}
              ></button>
              <button
                className='w-[50px] h-[50px] rounded-full bg-red-700'
                onClick={() => setShowTolistRed((perv) => !perv)}
              ></button>
            </div>
          )}
          <button
            onClick={() => setShowdivList((perv) => !perv)}
            className='w-[50px] h-[50px] rounded-full bg-green-700'
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
