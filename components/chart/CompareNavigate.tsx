'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const CompareNavigate = ({ username }: { username: string }) => {
  return (
    <Link href={`/compare?app=["${username}"]`}>
      <Button variant="outline" size="sm">
        Compare
      </Button>
    </Link>
  );
};
