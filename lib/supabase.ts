import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xpwussvcmqqppxynassz.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwd3Vzc3ZjbXFxcHB4eW5hc3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NDU3NzEsImV4cCI6MjA4NjMyMTc3MX0.GJ22Ou0QOT_G4sT6UE9Z2fUANlA8dX8A4EGLyDUUcS4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
