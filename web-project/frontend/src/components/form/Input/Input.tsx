import { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  name: string;
  title: string;
  type: HTMLInputTypeAttribute | 'Select' | 'TextArea';
  value: string | number;
  placeholder?: string;
  options?: string[];
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export const Input: React.FC<InputProps> = ({
  name,
  title,
  type,
  value,
  placeholder,
  options,
  onChange,
}) => {
  const getInput = () => {
    if (type === 'Select') {
      return (
        <select
          className='form-select'
          value={value}
          name={name}
          id={name}
          onChange={onChange}
        >
          <option className='form-select'>Choose...</option>
          {options?.map((option) => {
            return (
              <option className='form-select' value={option} key={option}>
                {option}
              </option>
            );
          })}
        </select>
      );
    }

    if (type === 'TextArea') {
      return (
        <textarea
          name={name}
          id={name}
          className='form-control'
          rows={3}
          value={value}
          onChange={onChange}
        />
      );
    }

    return (
      <input
        type={type}
        name={name}
        id={name}
        className='form-control'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };

  return (
    <>
      <div className='mb-3'>
        <label htmlFor={name} className='form-label'>
          {title}
        </label>
      </div>
      {getInput()}
    </>
  );
};
