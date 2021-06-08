import React, { useState } from 'react';
import { TodoStatus } from '../lib/enums';
import { Todo } from '../lib/todo.model';
import { TodoStatusSelector } from './todo-status-selector';
import { Toggle } from './toggle';

export interface TodoItemProps {
  item: Todo;
  isEditMode?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = (props) => {
  const [item, setItem] = useState<Todo>(props.item);
  const [updatedItem, setUpdatedItem] = useState<Todo>(props.item);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  function toggleEditMode() {
    if (isEditMode) {
      setUpdatedItem({ ...item });
    }

    setIsEditMode(!isEditMode);
  }

  function handleChange(e: any) {
    setUpdatedItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  }

  function handleStatusUpdate(status: TodoStatus) {
    setUpdatedItem({
      ...item,
      status,
    });
  }

  function handleSave() {
    setItem({ ...updatedItem });
    setIsEditMode(false);
  }

  function getStatusIcon(status: TodoStatus) {
    if (status === TodoStatus.New) return '📄';
    if (status === TodoStatus.InProgress) return '⏳';
    if (status === TodoStatus.Completed) return '✅';
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
              placeholder={updatedItem.title}
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
              placeholder={updatedItem.description}
            />
          </td>
          <td className="text-right">
            <button className="mr-4" onClick={handleSave}>
              Save
            </button>
            <button onClick={toggleEditMode}>Cancel</button>
          </td>
        </tr>
      ) : (
        <tr>
          <td className="text-center">{getStatusIcon(item.status)}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td className="text-right">
            <button className="mr-4" onClick={toggleEditMode}>
              Edit
            </button>
            <button onClick={toggleEditMode}>Delete</button>
          </td>
        </tr>
      )}
    </>
  );
};
