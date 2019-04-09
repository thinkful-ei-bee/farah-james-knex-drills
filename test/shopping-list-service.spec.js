const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list service object`, function() {
  let db
  let testShoppingList = [
    {
      id: 1,
      category: 'Breakfast',
      checked: false,
      name: 'Bagels',
      price: '2.10',
      date_added: new Date('2019-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      category: 'Breakfast',
      checked: false,
      name: 'Bagels',
      price: '2.10',
      date_added: new Date('2019-01-22T16:28:32.615Z')
    },
    {
      id: 3,
      category: 'Snack',
      checked: false,
      name: 'Bananas',
      price: '1.00',
      date_added: new Date('2019-01-22T16:28:32.615Z')
    },
  ]

  before(() => {
    db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
    })
  })


  after(() => db.destroy())

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db 
        .into('shopping_list')
        .insert(testShoppingList)
      })

  it(`getAllShoppingItems() resolves all articles from 'shopping_list' table`, () => {
        return ShoppingListService.getAllShoppingItems(db)
          .then(actual => {
            expect(actual).to.eql(testShoppingList)
          })
    })

    it(`updateItem() updates an item from the 'shopping_list' table`, () => {
      const idOfItemsToUpdate = 3
      const newItemData = {
        category: 'Snack',
        name: 'updated name',
        checked: false,
        price: "2.11",
        date_added: new Date(),
      }
      return ShoppingListService.updateItem(db, idOfItemsToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemsToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemsToUpdate,
            ...newItemData,
          })
        })
    })

    it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
      const itemId = 3
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllShoppingItems(db))
        .then(allItems => {
          const expected = testShoppingList.filter(item => item.id !== itemId)
          expect(allItems).to.eql(expected)
        })
    } )

    it(`getbyId() results an item by id from 'shopping_list' table`, () => {
      let thirdId = 3
      const thirdShoppingListItem = testShoppingList[thirdId = 1]
      return ShoppingListService.getById(db, thirdId)
      .then(actual => {
        expect(actual).to.eql({
          id: thirdId,
          category: thirdShoppingListItem.category, 
          name: thirdShoppingListItem.name,
          checked: thirdShoppingListItem.checked,
          price: thirdShoppingListItem.price,
          date_added: thirdShoppingListItem.date_added,
      })
    })
  })
  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllShoppingItems() resolves an empty array`, () => {
      return ShoppingListService.getAllShoppingItems(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })

    it(`insertShoppingItem() insert a new item and resolves the new item with an id`, () => {
      const newItem = {
        category: 'Snack',
        name: 'Test new name',
        checked: false,
        price: "2.11",
        date_added: new Date('2020-01-01T00:00:00.000Z'),
      }
      return ShoppingListService.insertShoppingItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            category: newItem.category, 
            name: newItem.name,
            checked: newItem.checked, 
            price: newItem.price, 
            date_added: newItem.date_added,
          })
        })
    })
})
})