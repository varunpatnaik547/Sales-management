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

  return
