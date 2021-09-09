import React from "react";
import {
  AddButton,
  DeleteButton,
  SaveButton,
  BackButton,
  SendButton,
  DragButton,
  EditButton,
} from "./Buttons";

export default function ButtonsRender() {
  return (
    <div>
      <SaveButton />
      <AddButton />
      <DeleteButton />
      <BackButton />
      <SendButton />
      <DragButton />
      <EditButton />
    </div>
  );
}
