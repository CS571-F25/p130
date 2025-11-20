// src/components/SearchableSelect.jsx
import { useEffect, useMemo, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";

export default function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder
}) {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const filtered = useMemo(() => {
    const s = (inputValue || "").toLowerCase();
    if (!s) return options;
    return options.filter((opt) => opt.toLowerCase().includes(s));
  }, [inputValue, options]);

  const handleSelect = (opt) => {
    setInputValue(opt);
    onChange?.(opt);
  };

  return (
    <div className="mb-2 position-relative">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={inputValue}
        placeholder={placeholder || `Type to search...`}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete="off"
      />
      {filtered.length > 0 && (
        <ListGroup
          className="position-absolute w-100 shadow-sm"
          style={{
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto"
          }}
        >
          {filtered.map((opt) => (
            <ListGroup.Item
              action
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault(); // prevent blur before click
                handleSelect(opt);
              }}
            >
              {opt}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
