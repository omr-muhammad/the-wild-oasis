import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://akohiiwquochfvymrech.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrb2hpaXdxdW9jaGZ2eW1yZWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MzQ5MTIsImV4cCI6MjAyOTUxMDkxMn0.TOc1eoNR3QczNUvPxJk13Gm8ntqf7qY7FSuk4505dzE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
