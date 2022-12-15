function clearForm(){
    document.getElementById('name').value='';
    document.getElementById('age').value='';
    document.getElementById('country').value='';
}
async function submitForm(){
    const name = document.getElementById('name').value; if(name.trim()===""){ alert('Ingrese Nombre'); return false;}
    const age = document.getElementById('age').value; if(age.trim()===""){ alert('Ingrese Edad'); return false;}
    const country = document.getElementById('country').value; if(country.trim()===""){ alert('Ingrese Pais'); return false;}
    const objUser = {name, age, country}

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objUser) 
    });

    if(response.status === 200){
        clearForm();
        listarUsuarios();
    }
}

async function editForm(){
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const country = document.getElementById('country').value;

    const objUser = {id, name, age, country}

    const response = await fetch('http://localhost:3000/users', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objUser) 
    });

    if(response.status === 200){
        document.getElementById('id').value="";
        document.getElementById('btnCrear').style.display = 'block';
        document.getElementById('btnEditar').style.display = 'none';
        clearForm();
        listarUsuarios();
    }
}
async function deleteUser(iduser){
    const response = await fetch('http://localhost:3000/users', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:iduser}) 
    });

    if(response.status === 200){
        listarUsuarios();
    }
}

async function getUser(iduser){
    const response = await fetch('http://localhost:3000/users?id='+iduser, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
   
    if(response.status === 200){
        const {id,name,age,country} = await response.json();
        document.getElementById('btnCrear').style.display = 'none';
        document.getElementById('btnEditar').style.display = 'block';
        document.getElementById('id').value=id;
        document.getElementById('name').value=name;
        document.getElementById('age').value=age;
        document.getElementById('country').value=country;
    }
}


async function listarUsuarios() {
    const response = await fetch('http://localhost:3000/users');
    const objeto = await response.json();
    const listado = document.getElementById('listado');
    let html = '';
    objeto.forEach(element => {
        html += `<div class='user'>
            <p>${element.name} - ${element.age} - ${element.country}</p> 
            <div class='botonesForm'>
                <button onclick="getUser('${element.id}')">EDITAR</button>
                <button onclick="deleteUser('${element.id}')">DELETE</button>
            </div>
        </div>`;
    });
    listado.innerHTML = html;
} listarUsuarios()