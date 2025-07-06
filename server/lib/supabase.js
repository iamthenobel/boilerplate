// server/lib/supabase.js
import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const { SUPABASE_URL, SUPABASE_KEY } = process.env

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase credentials in .env')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase
