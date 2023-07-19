"use client";

import { useState } from "react";

interface TCheckBoxProps {
  label: string;
  disabled?: boolean;
}

export const Checkbox = ({ label, ...others }: TCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
          {...others}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
