"use client";

import { useLogin } from "@/actions/login/post";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormField } from "@/components/form";

const schema = z.object({
  email: z.email(),
  password: z.string().min(3).max(8),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const loginAction = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginAction.execute(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">
          Login ke Akunmu
        </h1>

        <Form
          schema={schema}
          onSubmit={onSubmit}
          defaultValues={{
            email: "",
            password: "",
          }}
        >
          {({ formState, submit }) => (
            <>
              <FormField name="email" label="Email" required className="text-white">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="masukkan email kamu"
                />
              </FormField>

              <FormField name="password" label="Password" required  className="text-white">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="****"
                />
              </FormField>
              <button
                onClick={submit}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                {formState.isSubmitting ? "Loading..." : "Submit"}
              </button>
            </>
          )}
        </Form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-400 hover:text-blue-300">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
}
