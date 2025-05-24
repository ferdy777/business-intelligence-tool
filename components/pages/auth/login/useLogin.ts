import { useAuthContext } from "@/context/auth-context";
import useToast from "@/hooks/useToast";
import { Path } from "@/navigations/routes";
import { loginService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    accept: false,
  });

  const router = useRouter();
  const { handleSuccessToast } = useToast();
  const { handleLoginSuccess, handleSetAutoLogout } = useAuthContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const type = e.target.type;

    setForm((prev) => ({
      ...prev,
      [e.target.name]: type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ✅ Basic client-side validation
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginService({
        email: form.password,
        password: form.password,
      });

      if (!form.accept) {
        handleSetAutoLogout();
      }

      handleLoginSuccess(res.data);
      handleSuccessToast(res.message);

      router.push(Path.Dashboard);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // ✅ Show backend errors
      setError(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, handleChange, form, error, loading };
};

export default useLogin;
