"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DataTable } from "@/components/data-table";

export default function Report() {
  const db = createClient();
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [type, setType] = useState("");
  useEffect(() => {
    let query = db.from("expenses").select("id,expense_date,type,amount_claimed,approved_amount,profiles!expenses_sales_rep_id_fkey(full_name)").order("expense_date", { ascending: false });
    if (type) query = query.eq("type", type);
    query.then(({ data }) => {
      const reportRows = (data || []).map((expense) => ({
        ...expense,
        sales_rep: (expense.profiles as unknown as { full_name: string } | null)?.full_name,
      }));
      setRows(reportRows);
    });
  }, [type]);
  return <><div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold">Expense report</h2><select className="w-40" value={type} onChange={(e) => setType(e.target.value)}><option value="">All types</option>{["food", "hotel", "bus", "train", "bike_fuel", "car_fuel", "other"].map((item) => <option key={item}>{item}</option>)}</select></div><DataTable rows={rows} redKey="amount_claimed" columns={[{ key: "expense_date", label: "Date" }, { key: "sales_rep", label: "Sales representative" }, { key: "type", label: "Type" }, { key: "amount_claimed", label: "Claimed" }, { key: "approved_amount", label: "Approved" }]}/></>;
}
