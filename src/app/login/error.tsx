'use client';

import GenericError from '@/components/GenericError/GenericError';
import { ErrorType } from '@/types/errorTypes';

export default function Error({ error, reset }: ErrorType) {
    return <GenericError error={error} reset={reset} />;
}
