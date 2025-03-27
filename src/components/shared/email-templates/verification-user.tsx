import Link from 'next/link';
import React from 'react';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <Link href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Подтвердить регистрацию
      </Link>
    </p>
  </div>
);
