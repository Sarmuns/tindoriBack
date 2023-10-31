const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://sfslqomvcxzpfgipcfpg.supabase.co'; // Substitua pelo URL do seu Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmc2xxb212Y3h6cGZnaXBjZnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1OTg5NDUsImV4cCI6MjAxNDE3NDk0NX0.bhooTIhrpBtXbV_2nX75tAEvX1wwkSeeYV7uj71hxJA'; // Substitua pela chave privada do seu Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
