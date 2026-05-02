require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
);

async function main() {
    const { data, error } = await supabase
        .from('games')
        .select('id, title, release_year, price, rating')
        .order('rating', { ascending: false })
        .limit(10);

    if (error) { console.error(error.message); return; }
    console.table(data);
}

main();
