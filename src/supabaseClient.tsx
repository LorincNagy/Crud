import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mfxwtyzxpgesuxmidtrn.supabase.co";
const supabaseAnonKey = "sb_publishable_NCiOxit1xOImxDd9e-Oq4g_VS7IjTdE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
