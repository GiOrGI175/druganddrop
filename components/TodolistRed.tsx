'use client';

export default function TodolistRed() {
  return (
    <div>
      <div className='w-[500px] h-[500px] bg-yellow-200'>
        <div>
          <button>delate</button>
          <button>download</button>
        </div>
        <div>
          <input type='text' />
          <button>add</button>
        </div>
        <div>
          <ul></ul>
        </div>
      </div>
    </div>
  );
}
