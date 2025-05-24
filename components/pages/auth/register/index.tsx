"use client";

import FormInput from "@/components/common/formInput";
import Button from "@/components/common/button";
import Link from "next/link";
import { Path } from "@/navigations/routes";
import useRegister from "./useRegister";
import Container from "@/components/common/container";

const RegisterForm = () => {
  const { error, form, handleChange, handleSubmit, loading } = useRegister();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Container className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-grey-dark px-6 py-10 rounded-lg shadow-lg w-full max-w-md"
          aria-label="Registration form"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-text-grey dark:text-white">
            Register
          </h2>
          {error && (
            <div className="mb-4 p-2 bg-red-200/30 dark:bg-red-200/10 text-center text-red-800 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
          <FormInput
            name="fullName"
            onChange={handleChange}
            label="Full Name"
            value={form.fullName}
            disabled={loading}
          />
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
          <div>
            <Button
              label="Register"
              type="submit"
              fullWidth
              loading={loading}
            />
          </div>
        </form>
        <div className="flex text-[14px] gap-1 justify-center items-center mt-4 text-text-grey dark:text-white">
          <p>Already have an account?</p>
          <Link className="font-semibold underline" href={Path.Login}>
            Login
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default RegisterForm;
