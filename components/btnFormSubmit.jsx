'use client';

import { useFormStatus } from 'react-dom';

export default function BtnFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="btn-main" type="submit">
      {pending ? 'Saving...' : 'Save Note'}
    </button>
  );
}