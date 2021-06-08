import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { TodoList } from '../components/todo-list';
import { Todo } from '../lib/todo.model';

export default function Home() {
  const items: Todo[] = [
    {
      id: 1,
      title: 'Walk the Dog',
      description: 'You should probably walk the dog!',
      completed: false,
    },
    {
      id: 2,
      title: 'Feed the Fish',
      description: 'Feeding the fish is important.',
      completed: true,
    },
  ];

  const [todos, setTodos] = useState<Todo[]>(items);

  function handleNewTodoClick() {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: `Todo ${todos.length + 1}`,
      description: 'Just another todo!',
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }

  return (
    <main>
      <h1 className="text-4xl font-bold">Just Another Todo App</h1>

      <div>
        <button onClick={handleNewTodoClick}>Add Todo</button>
        <div>
          <TodoList todos={todos} />
        </div>
      </div>
    </main>
  );
}
