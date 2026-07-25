"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DataTable } from "@/components/data-table";

export default function Payouts() {
  const db = createClient();
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [ref, setRef] = useState("");

  const load = useCallback(async () => {
    const supabase = createClient();

    const { data } = await supabase
      .from("expenses")
      .select(
        "id,expense_date,type,approved_amount,profiles!expenses_sales_rep_id_fkey(full_name)"
      )
      .eq("status", "approved");

    setRows(
      (data || []).map((expense) => ({
        ...expense,
        sales_rep: (
          expense.profiles as unknown as { full_name: string } | null
        )?.full_name,
      }))
    );
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function pay(id: string) {
    if (!ref) return;

    await db
      .from("expenses")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        transaction_reference: ref,
      })
      .eq("id", id);

    setRef("");
    await load();
  }
return (
    <>
      <h2 className="mb-5 text-2xl font-bold">Pending payouts</h2>

      <div className="mb-4 flex gap-2">
        <input
          className="max-w-xs"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="Transaction reference"
        />
      </div>

      <DataTable
        rows={rows}
        columns={[
          { key: "expense_date", label: "Date" },
          { key: "sales_rep", label: "Representative" },
          { key: "type", label: "Type" },
          { key: "approved_amount", label: "Approved" },
        ]}
      />

      <div className="mt-3 space-y-2">
        {rows.map((expense) => (
          <button
            className="mr-2 border bg-white"
            key={String(expense.id)}
            onClick={() => pay(String(expense.id))}
          >
            Mark {String(expense.id).slice(0, 8)} paid
          </button>
        ))}
      </div>
    </>
  );
}
