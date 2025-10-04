import React from "react";

/**
 * Checkbox UI component
 * @param {object} props
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {function} props.onCheckedChange - Called with new checked value
 * @param {boolean} [props.disabled] - Whether the checkbox is disabled
 * @param {string} [props.className] - Additional class names
 */
export function Checkbox({ checked, onCheckedChange, disabled = false, className = "" }) {
  return (
    <label className={`inline-flex items-center cursor-pointer ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}>
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-primary border-gray-300 rounded transition"
        checked={!!checked}
        onChange={e => onCheckedChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="ml-2">{/* Optionally render children/label here */}</span>
    </label>
  );
}

export default Checkbox;