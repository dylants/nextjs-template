'use client';

import { AuthPostRequestBody } from '@/app/api/auth/route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { postAuth } from '@/lib/api';
import useAppContext from 'hooks/useAppContext';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function LoginPage() {
  const { setAuth } = useAppContext();
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<AuthPostRequestBody>();

  const onSubmit: SubmitHandler<AuthPostRequestBody> = useCallback(
    async (formInput) => {
      try {
        const { email, password } = formInput;

        const auth = await postAuth({ email, password });

        setAuth(auth);

        // TODO navigate back to where they were if this was a redirect
        router.push('/');
      } catch {
        // TODO handle error
      } finally {
        reset();
      }
    },
    [reset, router, setAuth],
  );

  return (
    <div className="flex justify-center">
      <div className="grid gap-4 w-fit">
        <div className="space-y-2">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className="col-span-3 h-8"
                  variant={errors['email'] ? 'error' : 'default'}
                  {...register('email', { required: true })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  className="col-span-3 h-8"
                  type="password"
                  variant={errors['password'] ? 'error' : 'default'}
                  {...register('password', { required: true })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="default" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}