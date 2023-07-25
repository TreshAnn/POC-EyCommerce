"use client";

import { Button, Checkbox, Header } from "ui";

export default function Page() {
  return (
    <>
      <Header text="Hello world!" />
      <Button style={{ marginBottom: "10px" }}>Sample</Button>
      <Checkbox label="checkbox 1" />
    </>
  );
}
