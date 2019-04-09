const knex = require('knex')
require('dotenv').config()

console.log(process.env.DB_URL);

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

function searchByProductName(searchTerm){
    knexInstance
        .select('name')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

function paginatedItems(pageNumber){
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance 
        .select('name', 'price', 'category', 'checked', 'date_added')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

function itemsAfterDate(daysAgo){
    knexInstance
        .select('date_added')
        .from('shopping_list')
        .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
        .then(result => {
            console.log(result)
        })
}

function totalCost(){
    knexInstance
        .select('category', 'price')
        .from('shopping_list')
        .groupBy('category', 'price')
        .then(result => {
            console.log(result)
        })
}

//searchByProductName('Not Dogs')
//paginatedItems(3)
//itemsAfterDate(15)
totalCost()



console.log('connection successful from drills.js');

