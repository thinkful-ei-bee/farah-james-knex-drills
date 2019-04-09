const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list service object`, function() {
  let db
  let testShoppingList = [
    {
        name: 'Bluffalo Wings',
        category: 'Snack'
    },
    {
        name: 'Antichovies',
        category: 'Breakfast'
    },
    {
        name: 'Salmock',
        category: 'Breakfast'
    },

  ]

  before(() => {
    db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
    })
  })

  before(() => {
    return db 
      .into('shopping_list')
      .insert(testShoppingList)
  })

describe(`getAllShoppingItems()`, () => {
    it(`resolves all shopping list items from 'shopping_list' table`, () => {
        // test that shopping-list-service.getAllShoppingItems gets data from table
    })
  })
})