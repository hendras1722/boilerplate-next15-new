"use client";

import { useLogin } from "@/actions/login/post";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "react-hook-form-easy-access";
import { useRef } from "react";
import type { FormRef } from "react-hook-form-easy-access/lib/esm/Form";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(8),
  address: z
    .array(
      z.object({
        street: z.string().min(3, "Street wajib diisi"),
        city: z.string().min(2, "City wajib diisi"),
      })
    )
    .min(1, "Minimal 1 alamat"),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const loginAction = useLogin();

  const formRef = useRef<FormRef<LoginFormData>>(null);

  const onSubmit = async (data: LoginFormData) => {
    await loginAction.execute(data);
  };

  return (
    <div className="min-h-screen flex items-center w-full justify-center bg-linear-to-br from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">Login ke Akunmu</h1>

        <Form
          ref={formRef}
          schema={schema}
          onSubmit={onSubmit}
          defaultValues={{
            email: "",
            password: "",
            address: [{ street: "", city: "" }],
          }}
        >
          {({ isPending, useFieldArray }) => {
            const { fields, append, remove } = useFieldArray("address");

            return (
              <>
                <FormField name="email" label="Email" required className="text-white">
                  <Input type="email" placeholder="masukkan email kamu" />
                </FormField>

                <FormField name="password" label="Password" required className="text-white">
                  <Input type="password" placeholder="****" />
                </FormField>

                <div className="mb-4">
                  <label className="block text-white font-semibold mb-1">Alamat</label>

                  {fields.map((field, index) => (
                    <div key={field.id} className="mb-3 p-3 border rounded-lg border-white/20">
                      <FormField name={`address.${index}.street`} label="Street" required>
                        <Input placeholder="Jl. Mawar No. 1" />
                      </FormField>

                      <FormField name={`address.${index}.city`} label="City" required>
                        <Input placeholder="Jakarta" />
                      </FormField>

                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-2 w-full"
                      >
                        Hapus Alamat
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={() => append({ street: "", city: "" })}
                    className="w-full mb-4 bg-green-600 text-white"
                  >
                    + Tambah Alamat
                  </Button>
                </div>

                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  {isPending ? "Loading..." : "Submit"}
                </Button>
              </>
            );
          }}
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
