import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/sharp-solid-svg-icons';

export default function FieldErrorMessage({ errorMessage }: { errorMessage?: string } = {}) {
  if (!errorMessage) {
    return null;
  }
  return (
    <p className="text-red-500 text-sm pt-2">
      <FontAwesomeIcon icon={faCircleXmark} /> &nbsp;{errorMessage}
    </p>
  );
}
