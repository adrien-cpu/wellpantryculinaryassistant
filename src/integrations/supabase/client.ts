// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ptwnbpcgrkslomeierrf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0d25icGNncmtzbG9tZWllcnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MjE2ODMsImV4cCI6MjA1OTA5NzY4M30.J2KJhJKG4u9XRmmA4Qou0CvpJMRYUb6Sd-oE90tVbag";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);