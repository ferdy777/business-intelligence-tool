"use client";

import FormInput from "@/components/common/formInput";
import Button from "@/components/common/button";
import FormCheckbox from "@/components/common/formCheckbox";
import Link from "next/link";
import { Path } from "@/navigations/routes";
import useLogin from "./useLogin";
import Container from "@/components/common/container";

const LoginForm = () => {
  const { error, form, handleChange, handleSubmit, loading } = useLogin();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black">
      <Container className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-grey-dark px-6 py-10 rounded-lg shadow-lg w-full max-w-md"
          aria-label="Login form"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-text-grey dark:text-white">
            Welcome Back
          </h2>
          {error && (
            <div className="mb-4 p-2 bg-red-200/30 dark:bg-red-200/10 text-center text-red-800 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
          <FormInput
            name="email"
            onChange={handleChange}
            label="Email"
            type="email"
            value={form.email}
            disabled={loading}
          />
          <FormInput
            name="password"
            onChange={handleChange}
            label="Password"
            type="password"
            value={form.password}
            disabled={loading}
          />
          <FormCheckbox
            name="accept"
            onChange={handleChange}
            label="Keep me logged in"
            checked={form.accept}
            disabled={loading}
          />
          <div>
            <Button label="Login" type="submit" fullWidth loading={loading} />
          </div>
        </form>
        <div className="flex text-[14px] gap-1 justify-center items-center mt-4 text-text-grey dark:text-white">
          <p>Don&apos;t have an account?</p>
          <Link className="font-semibold underline" href={Path.Register}>
            Register
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
