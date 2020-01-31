const db = require('../database/dbConfig.js');

module.exports = {
    add, 
    find, 
    findById, 
    findBy, 
}


function find(){
    return db('users').select('username', 'password')
}

async function add(name){
    const [id] = await db('users')
    .insert(name)
    return findById(id);
}

function findById(id){
    return db('users').select('id','username', 'password')
    .where({id})
    .first();
}

function findBy(input){
    return db('users').where(input)
}