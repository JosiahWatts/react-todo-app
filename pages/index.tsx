import { useState } from 'react';
import { TodoList } from '../components/todo-list';
import { TodoStatus } from '../lib/enums';
import { Todo } from '../lib/todo.model';

const MOCK_TODOS: Todo[] = [
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

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);

  function handleNewTodoClick() {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: `Untitled`,
      description: '',
      status: TodoStatus.New,
    };

    setTodos([...todos, newTodo]);
  }

  function handleTodoUpdate(todo: Todo) {
    const newTodos = [...todos];
    const index = todos.findIndex((x) => x.id === todo.id);
    const updatedTodo = { ...todos[index], ...todo };
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
  }

  function handleTodoDelete(id: number) {
    const newTodos = todos.filter((x) => x.id !== id);
    setTodos(newTodos);
  }

  return (
    <main>
      <h1 className="text-4xl font-bold">Just Another Todo App</h1>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <button className="mr-4 btn-tertiary" onClick={handleNewTodoClick}>
            + Add Todo
          </button>
        </div>
        <TodoList
          todos={todos}
          handleTodoUpdate={handleTodoUpdate}
          handleTodoDelete={handleTodoDelete}
        />
      </div>
    </main>
  );
}
