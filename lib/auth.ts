import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile, Role } from "@/lib/types";
export async function requireProfile(roles?: Role[]): Promise<Profile> { const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/login"); const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single(); if (!data || data.status !== "active" || (roles && !roles.includes(data.role))) redirect("/dashboard"); return data as Profile; }
