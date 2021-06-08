import { Switch } from '@headlessui/react';
import React, { useState } from 'react';

export interface ToggleProps {
    toggled: boolean;
    label: string;
}

export const Toggle: React.FC<ToggleProps> = (props) => {
  const [isToggled, setIsToggled] = useState<boolean>(props.toggled);

  return (
    <Switch
      checked={isToggled}
      onChange={setIsToggled}
      className={`${
        isToggled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">{props.label}</span>
      <span
        className={`${
          isToggled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
};
