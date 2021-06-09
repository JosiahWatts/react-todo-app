import React from 'react';

export interface EditableTextProps {
  text: string;
  isEditing: boolean;
  value: string;
  handleChange: (e: any) => void;
}

export const EditableText: React.FC<EditableTextProps> = (props) => {
  const { text, value, isEditing, handleChange } = props;

  return isEditing ? (
    <input
      className="w-full form-input"
      type="text"
      name={value}
      id="{updatedItem.title}-name"
      value={text}
      onChange={handleChange}
      placeholder={text}
    />
  ) : (
    <span>{text}</span>
  );
};
