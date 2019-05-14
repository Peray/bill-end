// CRUD SQL语句 
var user = { 
    login: 'select * from user where name=? and password=?',
    queryAll: 'select * from products;',
    insert:'insert into products(name, startDate, endDate, curMon, nextMon) values(?,?,?,?,?);', 
    update:'update products set name=?, startDate=?, endDate=?, curMon=?, nextMon=? where id=?;', 
    delete: 'delete from products where id=?;', 
    queryById: 'select * from products where id=?;', 
    
    
}; 
module.exports = user;