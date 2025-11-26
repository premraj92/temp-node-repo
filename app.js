const _ = require('lodash')

const itemsList = [1, [2, 3, [4, 5], 6], 7];

console.log(`Original Items List `, itemsList);

const flattenedItemsList = _.flattenDeep(itemsList)

console.log(`Flattened Items List `, flattenedItemsList);