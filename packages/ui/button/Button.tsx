"use client";
import { Button as MButton, ButtonProps } from "@mantine/core";

export interface TButtonProps extends ButtonProps {
  // extra abstracted props
}

export const Button = ({ children, ...others }: TButtonProps) => {
  return <MButton {...others}>{children}</MButton>;
};
