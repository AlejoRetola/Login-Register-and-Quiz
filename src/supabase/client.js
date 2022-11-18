import { createClient } from "@supabase/supabase-js";

export const client  = createClient(
    "https://ywlccjuyzzrkgrgkxavo.supabase.co" , 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3bGNjanV5enpya2dyZ2t4YXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgwMzE3MjIsImV4cCI6MTk4MzYwNzcyMn0.D__JSzyyU9TzorwxwVzcnZ9EAE46VSw75VcvGrWhoVE"
)