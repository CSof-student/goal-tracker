import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://frhqqtfkjctcfhbiodvz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyaHFxdGZramN0Y2ZoYmlvZHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDc2NDMsImV4cCI6MjA2NTE4MzY0M30.5KyhlX0MjJnhbTqDkLcidCc0XE8OBnu_qA_OK5W2V7M"

export const supabase = createClient(supabaseURL,supabaseAnonKey)