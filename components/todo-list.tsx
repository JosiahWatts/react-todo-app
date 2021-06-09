import React from 'react';
import { Todo } from '../lib/todo.model';
import { TodoItem } from './todo-item';

export interface TodoListProps {
  todos: Todo[];
  handleTodoUpdate: (todo: Todo) => void;
  handleTodoDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = (props) => {
  const { todos, handleTodoUpdate, handleTodoDelete } = props;

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="border-b-1 border-gray-600">
            <td className="text-sm w-32 text-center border-b border-b-1 border-gray-600">
              Status
            </td>
            <td className="text-sm w-80 border-b border-b-1 border-gray-600">
              Title
            </td>
            <td className="text-sm border-b border-b-1 border-gray-600">
              Description
            </td>
            <td className="w-52 text-right border-b border-b-1 border-gray-600"></td>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo: Todo, index: number) => (
            <TodoItem
              key={index}
              item={todo}
              handleTodoUpdate={handleTodoUpdate}
              handleTodoDelete={handleTodoDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
