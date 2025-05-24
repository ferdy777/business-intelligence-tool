import useToast from "@/hooks/useToast";
import { Path } from "@/navigations/routes";
import { registerService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const useRegister = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const { handleSuccessToast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim()) return setError("Full name is required.");
    if (!form.email.trim()) return setError("Email is required.");
    if (!form.password || form.password.length < 6)
      return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await registerService(form);

      router.push(Path.Login);
      handleSuccessToast(res.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleChange, handleSubmit, error, loading, form };
};

export default useRegister;
