'use client';

import useAppContext from '@/hooks/useAppContext';

export default function Home() {
  const { auth } = useAppContext();

  return (
    <div>
      <main className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col gap-4 items-center">
          <h1>Home</h1>
          {auth.isLoggedIn ? (
            <div>User is logged in as {auth.email}</div>
          ) : (
            <div>User is logged out</div>
          )}
        </div>
      </main>
    </div>
  );
}
