import { RadioGroup } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { TodoStatus } from '../lib/enums';

interface TodoStatusSelectorProps {
  initialStatus: TodoStatus;
  onChange: (status: TodoStatus) => void;
}

export const TodoStatusSelector: React.FC<TodoStatusSelectorProps> = (
  props
) => {
  const { initialStatus, onChange } = props;
  const [status, setStatus] = useState<TodoStatus>(initialStatus);

  useEffect(() => {
    onChange(status);
  }, [status]);

  return (
    <RadioGroup className="inline-flex" value={status} onChange={setStatus}>
      <RadioGroup.Option className="cursor-pointer" value={TodoStatus.New}>
        {({ checked }) => (
          <span title="New" className={checked ? 'bg-blue-200' : ''}>📄</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option className="mx-4 cursor-pointer" value={TodoStatus.InProgress}>
        {({ checked }) => (
          <span title="In Progress" className={checked ? 'bg-blue-200' : ''}>⏳</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option className="cursor-pointer" value={TodoStatus.Completed}>
        {({ checked }) => (
          <span title="Complete" className={checked ? 'bg-blue-200' : ''}>✅</span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};
