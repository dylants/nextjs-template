'use client';

import WidgetsTable from '@/components/widget/WidgetsTable';
import useHandleError from '@/hooks/useHandleError';
import useLoginError from '@/hooks/useLoginError';
import { getWidgets } from '@/lib/api';
import UnauthorizedError from '@/lib/errors/UnauthorizedError';
import LoginError from '@/types/LoginError';
import Widget from '@/types/Widget';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isLoadingWidgets, setIsLoadingWidgets] = useState(true);
  const { handleError } = useHandleError();
  const router = useRouter();
  const { buildLoginErrorUrl } = useLoginError();

  const loadWidgets = useCallback(async () => {
    setIsLoadingWidgets(true);
    try {
      const data = await getWidgets();
      setWidgets(data);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return router.push(buildLoginErrorUrl(LoginError.UNAUTHORIZED));
      }

      return handleError(error);
    } finally {
      setIsLoadingWidgets(false);
    }
  }, [buildLoginErrorUrl, handleError, router]);

  useEffect(() => {
    loadWidgets();
  }, [loadWidgets]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1>Widgets</h1>

        <div className="rounded-md border">
          <WidgetsTable
            widgets={widgets}
            linkPathname="/widgets"
            isLoading={isLoadingWidgets}
          />
        </div>
      </div>
    </div>
  );
}
