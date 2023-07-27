"use client";

import { Button, Checkbox, Header } from "ui";
import "./style.css";

export default function Page() {
  return (
    <>
      <Header />
      <Button style={{ marginBottom: "10px" }}>Sample</Button>
      <Checkbox label="checkbox 1" />
    </>
  );
}
