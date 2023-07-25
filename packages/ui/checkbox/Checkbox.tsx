"use client";

import { useState } from "react";
import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
} from "./styles";
import { TCheckBoxProps } from "./types";

export const Checkbox = ({ label, ...props }: TCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="checkbox-wrapper">
      <label>
        <CheckboxContainer>
          <HiddenCheckbox
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            {...props}
          />
          <StyledCheckbox checked={isChecked}>
            <Icon viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </Icon>
          </StyledCheckbox>
        </CheckboxContainer>
        <span>{label}</span>
      </label>
    </div>
  );
};
