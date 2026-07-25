"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadFile } from "@/components/upload";

export default function Visits() {
  const db = createClient();
  const [customers, setCustomers] = useState<
    { id: string; company_name: string }[]
  >([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const supabase = createClient();

    void supabase
      .from("customers")
      .select("id,company_name")
      .then(({ data }) => setCustomers(data || []));
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const f = new FormData(e.currentTarget);
    const photo = f.get("photo") as File;
    const photo_path = photo?.size
      ? await uploadFile(photo, "visits")
      : null;

    const { error } = await db.from("customer_visits").insert({
      customer_id: f.get("customer"),
      remark: f.get("remark"),
      follow_up_date: f.get("followup"),
      photo_path,
    });

    setMsg(error?.message || "Visit recorded.");

    if (!error) e.currentTarget.reset();
  }

  return (
    <>
      <h2 className="mb-5 text-2xl font-bold">Customer visit</h2>

      <form
        onSubmit={submit}
        className="max-w-xl space-y-4 rounded-xl border bg-white p-5"
      >
       <select name="customer" required>
  <option value="">Select customer</option>

  {customers.map((customer) => (
    <option key={customer.id} value={customer.id}>
      {customer.company_name}
    </option>
  ))}
        <textarea
          name="remark"
          placeholder="Remark"
          className="w-full rounded border p-2"
          rows={3}
        />

        <input
          type="date"
          name="followup"
          className="w-full rounded border p-2"
        />

        <input type="file" name="photo" accept="image/*" />

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>

      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </>
  );
}
