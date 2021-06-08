import React from 'react';
import { Todo } from '../lib/todo.model';
import { TodoItem } from './todo-item';

export interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = (props) => {
  const { todos } = props;

  return (
    <table className="w-full">
      <tbody>
        <tr className="border-b-1 border-gray-600">
          <td className="text-sm w-80">Title</td>
          <td className="text-sm">Description</td>
          <td className="text-sm w-52 text-right">Is Complete?</td>
          <td className="w-52 text-right"></td>
        </tr>

        {todos.map((todo: Todo, index: number) => (
          <tr key={index}>
            <TodoItem item={todo} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
