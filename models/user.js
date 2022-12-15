const { v4: uudiv4 } = require('uuid');

class User {
    
    id = '';
    name = '';
    age = 0;
    country = '';

    constructor( name, age, country ) {
        this.id = uudiv4();
        this.name = name;
        this.age = age;
        this.country = country;
    }

}



module.exports = User;
