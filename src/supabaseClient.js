import {createClient} from '@supabase/supabase-js'

const supabaseUrl = "https://zvmvzhblorbynyweopvd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bXZ6aGJsb3JieW55d2VvcHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMDE4MDUsImV4cCI6MjA2NDg3NzgwNX0.pUwLYMaRSdDAQACzYvjeWDpcbAZqjqk6punt61bW0YM";

export const supabase = createClient(supabaseUrl, supabaseKey); 