import { useState } from 'react';
import { TodoList } from '../components/todo-list';
import { TodoStatus } from '../lib/enums';
import { Todo } from '../lib/todo.model';

export default function Home() {
  const items: Todo[] = [
    {
      id: 1,
      title: 'Walk the Dog',
      description: 'You should probably walk the dog!',
      status: TodoStatus.New,
    },
    {
      id: 2,
      title: 'Feed the Fish',
      description: 'Feeding the fish is important.',
      status: TodoStatus.Completed,
    },
    {
      id: 3,
      title: 'Write the Book',
      description: 'This will probably never get done.',
      status: TodoStatus.InProgress,
    },
  ];

  const [todos, setTodos] = useState<Todo[]>(items);

  function handleNewTodoClick() {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: `Todo ${todos.length + 1}`,
      description: 'Just another todo!',
      status: TodoStatus.New,
    };

    setTodos([...todos, newTodo]);
  }

  return (
    <main>
      <h1 className="text-4xl font-bold">Just Another Todo App</h1>

      <div className="mt-8">
        <button className="mb-4" onClick={handleNewTodoClick}>Add Todo</button>
        <TodoList todos={todos} />
      </div>
    </main>
  );
}
