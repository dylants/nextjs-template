'use client';

import { Button } from '@/components/ui/button';
import useAppContext from '@/hooks/useAppContext';
import Link from 'next/link';

function NavLink({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const buttonContent = (
    <Button
      variant="outline"
      className="flex flex-col items-center py-0 h-[80px] w-[150px] text-lg"
    >
      {children}
    </Button>
  );

  return <Link href={path}>{buttonContent}</Link>;
}

export default function Home() {
  const { auth } = useAppContext();

  return (
    <div>
      <main>
        <div className="flex flex-col gap-4 items-center">
          <h1>Home</h1>
          {auth.isLoggedIn ? (
            <div>User is logged in as {auth.email}</div>
          ) : (
            <div>User is logged out</div>
          )}
          <div className="flex gap-4">
            <NavLink path="/login">
              <p className="whitespace-normal break-normal">
                Login Page (unprotected)
              </p>
            </NavLink>
            <NavLink path="/widgets">
              <p className="whitespace-normal break-normal">
                Widgets Page (protected)
              </p>
            </NavLink>
          </div>
        </div>
      </main>
    </div>
  );
}
