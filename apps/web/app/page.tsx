"use client";

import { Button, Checkbox, HeaderNavBar } from "ui";
import "./style.css";

export default function Page() {
  return (
    <>
      <HeaderNavBar />
      <Button style={{ marginBottom: "10px" }}>Sample</Button>
      <Checkbox label="checkbox 1" />
    </>
  );
}
