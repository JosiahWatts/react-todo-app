import React, { useState } from 'react';
import { Todo } from '../lib/todo.model';
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

  function handleSave() {
    setItem({ ...updatedItem });
    setIsEditMode(false);
  }

  return (
    <>
      {isEditMode ? (
        <>
          <td>
            <input
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
              type="text"
              name="description"
              id="{updatedItem.title}-description"
              value={updatedItem.description}
              onChange={handleChange}
              placeholder={updatedItem.description}
            />
          </td>
          <td className="text-right">
            <Toggle
              label={`Complete ${updatedItem.title}`}
              toggled={updatedItem.completed}
            />
          </td>
          <td className="text-right">
            <button className="mr-4" onClick={handleSave}>
              Save
            </button>
            <button onClick={toggleEditMode}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td className="text-right">{`${item.completed}`}</td>
          <td className="text-right">
            <button onClick={toggleEditMode}>Edit</button>
          </td>
        </>
      )}
    </>
  );
};
