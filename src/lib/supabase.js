import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cvmvqogbepbfyoxufliu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bXZxb2diZXBiZnlveHVmbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMzM4NDEsImV4cCI6MjA2NTcwOTg0MX0.sXfftI7r0UVG4we53lXKn7S0OYPY9EOmLDlNLIz0ShA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);