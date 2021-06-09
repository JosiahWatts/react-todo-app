import React, { useState } from 'react';
import { TodoStatus } from '../lib/enums';
import { Todo } from '../lib/todo.model';
import { EditableText } from './editable-text';
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
    <tr>
      <td className="text-center">
        {isEditMode ? (
          <TodoStatusSelector
            initialStatus={updatedItem.status}
            onChange={handleStatusUpdate}
          />
        ) : (
          renderStatusIcon(updatedItem.status)
        )}
      </td>
      <td>
        <EditableText
          isEditing={isEditMode}
          text={updatedItem.title}
          value="title"
          handleChange={handleChange}
        />
      </td>
      <td>
        <EditableText
          isEditing={isEditMode}
          text={updatedItem.description}
          value="description"
          handleChange={handleChange}
        />
      </td>
      <td className="text-right">
        {isEditMode ? (
          <div>
            <button className="mr-4 btn-tertiary --small" onClick={handleSave}>
              Save
            </button>
            <button className="btn-tertiary --small" onClick={toggleEditMode}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              className="mr-4 btn-tertiary --small"
              onClick={toggleEditMode}
            >
              Edit
            </button>
            <button
              className="btn-tertiary --small --danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
