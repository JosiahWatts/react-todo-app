import React, { useState } from 'react';
import { TodoStatus } from '../lib/enums';
import { Todo } from '../lib/todo.model';
import { TodoStatusSelector } from './todo-status-selector';

export interface TodoItemProps {
  item: Todo;
  handleTodoUpdate: (todo: Todo) => void;
  handleTodoDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { item, handleTodoUpdate, handleTodoDelete } = props;
  const [updatedItem, setUpdatedItem] = useState<Todo>(item);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  function toggleEditMode() {
    if (isEditMode) {
      setUpdatedItem({ ...item });
    }

    setIsEditMode(!isEditMode);
  }

  function handleChange(e: any) {
    setUpdatedItem({
      ...updatedItem,
      [e.target.name]: e.target.value,
    });
  }

  function handleStatusUpdate(status: TodoStatus) {
    setUpdatedItem({
      ...updatedItem,
      status,
    });
  }

  function handleDelete() {
    handleTodoDelete(item.id);
  }

  function handleSave() {
    handleTodoUpdate(updatedItem);
    setIsEditMode(false);
  }

  function renderStatusIcon(status: TodoStatus): string {
    if (status === TodoStatus.New) return '🗒️';
    if (status === TodoStatus.InProgress) return '⏳';
    if (status === TodoStatus.Completed) return '✅';

    return '';
  }

  return (
    <>
      {isEditMode ? (
        <tr>
          <td className="text-center">
            <TodoStatusSelector
              initialStatus={updatedItem.status}
              onChange={handleStatusUpdate}
            />
          </td>
          <td>
            <input
              className="w-full form-input"
              type="text"
              name="title"
              id="{updatedItem.title}-name"
              value={updatedItem.title}
              onChange={handleChange}
              placeholder={item.title}
            />
          </td>
          <td>
            <input
              className="w-full form-input"
              type="text"
              name="description"
              id="{updatedItem.title}-description"
              value={updatedItem.description}
              onChange={handleChange}
              placeholder={item.description}
            />
          </td>
          <td className="text-right">
            <button className="mr-4 btn-tertiary --small" onClick={handleSave}>
              Save
            </button>
            <button className="btn-tertiary --small" onClick={toggleEditMode}>Cancel</button>
          </td>
        </tr>
      ) : (
        <tr>
          <td className="text-center">{renderStatusIcon(item.status)}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td className="text-right">
            <button className="mr-4 btn-tertiary --small" onClick={toggleEditMode}>
              Edit
            </button>
            <button className="btn-tertiary --small --danger" onClick={handleDelete}>Delete</button>
          </td>
        </tr>
      )}
    </>
  );
};
