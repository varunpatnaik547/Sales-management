import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    email,
    password,
    full_name,
    employee_id,
    phone,
    home_city,
  } = body;

  // Create Auth User
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // Create Profile
  const { error: profileError } = await admin
    .from("profiles")
    .insert({
      id: data.user.id,
      email,
      full_name,
      employee_id,
      phone,
      home_city,
      status: "active",
      role: "sales_rep",
    });

  if (profileError) {
    return NextResponse.json(
      { error: profileError.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}