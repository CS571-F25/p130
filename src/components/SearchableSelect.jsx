// src/components/SearchableSelect.jsx
import { useMemo, useState } from "react";
import { Form } from "react-bootstrap";

export default function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return options.filter((opt) => opt.toLowerCase().includes(s));
  }, [search, options]);

  return (
    <div className="mb-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className="mb-1"
        placeholder={placeholder || `Search ${label.toLowerCase()}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Form.Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select...</option>
        {filtered.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
