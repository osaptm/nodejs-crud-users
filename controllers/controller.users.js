const User = require('../models/user');

class ControllerUser {
    _listado = {};
    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    cargarUsersFromArray( users = [] ) {        
        users.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearUser( name, age, country ) {
        const Usuario = new User(name, age, country);
        this._listado[Usuario.id] = Usuario;
    }
    deleteUser( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }
    getUser( id = '' ) {
        if ( this._listado[id] ) {
            return this._listado[id];
        }
    }
    editUser( id , name, age, country ) {
        if ( this._listado[id] ) {
            this._listado[id].name = name;
            this._listado[id].age = age;
            this._listado[id].country = country;
        }
    }

}

module.exports = ControllerUser;