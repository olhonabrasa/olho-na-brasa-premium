import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pwpfpseatkwluahjqclc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3cGZwc2VhdGt3bHVhaGpxY2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMTE3ODcsImV4cCI6MjA5ODU4Nzc4N30.-GVNob3emozEd62PB4mVJ-A-FXWEp_uO-ccnx8egimk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
