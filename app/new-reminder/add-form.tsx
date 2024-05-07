"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createReminder } from "./actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export function AddForm() {
  const [state, formAction] = useFormState(createReminder, initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};

    const response = await createReminder(formData);

    console.log(response);

    console.log("Form Data:", data);

    //event.target.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Enter Reminder Name</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="due_at">Due At</label>
      <input type="date" id="due_at" name="due_at" required />

      <label htmlFor="priority_id">Priority</label>
      <input type="number" id="priority_id" name="priority_id" required />

      <label htmlFor="details">Details</label>
      <textarea id="details" name="details" required />

      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
