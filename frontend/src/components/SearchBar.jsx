import { useState, useEffect } from 'react';

export default function SearchBar({ value, onChange }) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      if (input !== value) onChange(input);
    }, 300);
    return () => clearTimeout(id);
  }, [input]);

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search tasks..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}