'use client';

import { useState } from 'react';
import TodolistYellow from '@/components/Todolist';
import TodolitsGreen from '@/components/TodolitsGreen';
import TodolistBlue from '@/components/TodolistBlue';
import TodolistRed from '@/components/TodolistRed';
import { Reorder } from 'framer-motion';

type TodoList = {
  id: string;
  color: string;
  component: JSX.Element;
  visible: boolean;
};

export default function Home() {
  const [showdivList, setShowdivList] = useState(false);

  const [todos, setTodos] = useState<TodoList[]>([
    {
      id: 'yellow',
      color: 'yellow',
      component: <TodolistYellow />,
      visible: false,
    },
    {
      id: 'green',
      color: 'green',
      component: <TodolitsGreen />,
      visible: false,
    },
    { id: 'blue', color: 'blue', component: <TodolistBlue />, visible: false },
    { id: 'red', color: 'red', component: <TodolistRed />, visible: false },
  ]);

  const toggleTodoVisibility = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, visible: !todo.visible } : todo
      )
    );
  };

  const visibleTodoIds = todos
    .filter((todo) => todo.visible)
    .map((todo) => todo.id);

  return (
    <div className='min-h-screen flex flex-col'>
      <Reorder.Group
        className='flex flex-col justify-center items-center gap-7 '
        values={visibleTodoIds}
        onReorder={(newOrder) => {
          setTodos((prevTodos) => {
            const reorderedTodos = newOrder.map(
              (id) => prevTodos.find((todo) => todo.id === id)!
            );
            return reorderedTodos;
          });
        }}
      >
        {todos
          .filter((todo) => todo.visible)
          .map((todo) => (
            <Reorder.Item key={todo.id} value={todo.id}>
              {todo.component}
            </Reorder.Item>
          ))}
      </Reorder.Group>

      <div className='h-[300px] flex justify-self-end	 self-end fixed top-[60%]'>
        <div className='flex flex-col items-end justify-end gap-3'>
          {showdivList && (
            <div className='flex flex-col gap-3 border-[1px] bg-slate-500 rounded-[20px]'>
              <button
                className='w-[50px] h-[50px] rounded-full bg-yellow-300'
                onClick={() => toggleTodoVisibility('yellow')}
              ></button>
              <button
                className='w-[50px] h-[50px] rounded-full bg-green-700'
                onClick={() => toggleTodoVisibility('green')}
              ></button>
              <button
                className='w-[50px] h-[50px] rounded-full bg-blue-500'
                onClick={() => toggleTodoVisibility('blue')}
              ></button>
              <button
                className='w-[50px] h-[50px] rounded-full bg-red-700'
                onClick={() => toggleTodoVisibility('red')}
              ></button>
            </div>
          )}

          <button
            onClick={() => setShowdivList((prev) => !prev)}
            className='w-[50px] h-[50px] rounded-full bg-green-700 '
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
