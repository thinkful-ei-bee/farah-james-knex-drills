// const knex = require('knex')
// require('dotenv').config()

console.log(process.env.DB_URL);

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

// const q1 = knexInstance
//   .select("video_name, region")
//   .from('whopipe_video_views');
//   console.log(q1.toQuery());

// knexInstance
//   .select("*")
//   .from('amazong_products')
//   .where('product_id', 28) // all three of these .where are equivalent
//   // .where({'product_id' : 28})
//   // .where('product_id', '=', 28)
//   .debug() // not necessary, but will show you what the sql called is
//   .then( results => {
//     console.log(results);
//   })

  knexInstance
  .first('*') // select the first (column names)
  .from('amazong_products')
  .where('name', 'ILIKE', '%Healing%') // %healing% is case sensitive, ILIKE makes it case insensitive
  .debug() // not necessary, but will show you what the sql called is
  .then( results => {
    console.log(results);
  })

console.log('connection successful');