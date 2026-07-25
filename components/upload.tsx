"use client";
import { createClient } from "@/lib/supabase/client";
export async function uploadFile(file: File, folder: string) { const supabase=createClient(); const path=`${folder}/${crypto.randomUUID()}-${file.name}`; const {error}=await supabase.storage.from("sales-files").upload(path,file); if(error) throw error; return path; }
