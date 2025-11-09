"use client";

import { Input } from "@/components/ui/input";
import { Form, FormField, useFormField } from "@/components/form";
import z from "zod";

// Validasi pakai Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(8),
  addresses: z.array(z.object({ value: z.string().min(1, "Alamat wajib diisi") })),
});

type TypeSubmit = z.Infer<typeof schema>;

export default function LoginPage() {
  const onSubmit = (data: TypeSubmit) => {
    console.log("Form data:", data);
  };

  // ✅ Komponen inline di file yang sama
  function DynamicAddresses() {
    const { fields, append, remove } = useFormField("addresses");

    return (
      <>
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            name={`addresses.${index}.value`}
            label={`Alamat ${index + 1}`}
            required
          >
            <Input placeholder="Masukkan alamat" />
          </FormField>
        ))}

        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button
            type="button"
            onClick={() => append({ value: "" })}
            style={{
              background: "green",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            Tambah Alamat
          </button>
          <button
            type="button"
            onClick={() => remove(fields.length - 1)}
            style={{
              background: "red",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            Hapus Terakhir
          </button>
        </div>
      </>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #1e293b, #334155)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Login ke Akunmu
        </h1>

        <Form
          schema={schema}
          onSubmit={onSubmit}
          defaultValues={{
            email: "",
            password: "",
            addresses: [{ value: "" }],
          }}
        >
          {({ submit }) => (
            <>
              <FormField name="email" label="Email" required>
                <Input placeholder="Masukkan email" />
              </FormField>

              <FormField name="password" label="Password" required>
                <Input type="password" placeholder="****" />
              </FormField>

              <h3 style={{ marginTop: "1rem" }}>Alamat</h3>
              <DynamicAddresses />

              <button
                onClick={submit}
                type="submit"
                style={{
                  marginTop: "1.5rem",
                  width: "100%",
                  background: "#2563eb",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  fontWeight: "500",
                }}
              >
                Submit
              </button>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
