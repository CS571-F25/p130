// src/components/SearchableSelect.jsx
import { useEffect, useMemo, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";

let nextId = 0;

export default function SearchableSelect({
  id,
  label,
  options,
  value,
  onChange,
  placeholder
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [open, setOpen] = useState(false);
  const controlId = id || `searchable-select-${nextId++}`;

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
    setOpen(false);
  };

  const handleBlur = () => {
    // Delay so click on option still registers
    setTimeout(() => setOpen(false), 100);
  };

  return (
    <Form.Group className="mb-2" controlId={controlId}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        value={inputValue}
        placeholder={placeholder || "Type to search..."}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val);
          onChange?.(val); // lets keyboard-only users type a value
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open}
        role="combobox"
      />
      {open && filtered.length > 0 && (
        <ListGroup
          className="mt-1"
          style={{ maxHeight: "200px", overflowY: "auto" }}
          role="listbox"
        >
          {filtered.map((opt) => (
            <ListGroup.Item
              action
              role="option"
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(opt);
              }}
            >
              {opt}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form.Group>
  );
}
