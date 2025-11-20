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
  const [open, setOpen] = useState(false);

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
    setOpen(false); // hide list after selecting
  };

  const handleBlur = () => {
    // small delay so clicks on the list still register
    setTimeout(() => setOpen(false), 100);
  };

  return (
    <div className="mb-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={inputValue}
        placeholder={placeholder || `Type to search...`}
        onChange={(e) => {
          setInputValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <ListGroup
          className="mt-1"
          style={{
            maxHeight: "200px",
            overflowY: "auto"
          }}
        >
          {filtered.map((opt) => (
            <ListGroup.Item
              action
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault(); // don't blur before click
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
