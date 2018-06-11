
//Añadir Firebase!!
firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: ""
});

// Initialize Cloud Firestore through Firebase
// Esta variable es fundamental para el uso de la DB.
var db = firebase.firestore();

// Agrega documentos.
// .add Agrega ID automatico a nuestro documento.
function guardar(){
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var fecha = document.getElementById('fecha').value;


  db.collection("users").add({
      first: nombre,
      last: apellido,
      born: fecha
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
// Si el .then se ejecuta como caso exitoso,
// el texto que este en los imputs se limpia
// con la siguiente exprecion : .value = '';
      var nombre = document.getElementById('nombre').value = '';
      var apellido = document.getElementById('apellido').value = '';
      var fecha = document.getElementById('fecha').value = '';
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
// Leer datos de la DB.
// .onSnapshot((querySnapshot) Para agregar datos en tiempo real.
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
  // tabla.innerHTML = ''; Limpeza de tabla (Inicia nuestra tabla de 0).
  // Si se agrega un dato nuevo, no se vuelve a cargar los datos
  // de la tabla que ya existen.
    tabla.innerHTML = '';
    // forEach Se repite por cada ducumento que tengamos en user
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data().first}`);

        //   tabla.innerHTML Pra insertar los datos de la DB,
        // en la tabla del index.
        // += Por cada ciclo, se pinta un nuevo dato (consecutivo).
        //
        tabla.innerHTML += `
        <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().first}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().born}</td>
          <td><button class="btn btn-danger"  onclick="eliminar('${doc.id}')">Eliminar</button></td>
          <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
        </tr>
           `;
    });
});

// Borrar datos
function eliminar (id){
  db.collection("users").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}

// Editar documento.

function editar(id,nombre,apellido,fecha){

  document.getElementById('nombre').value = nombre;
  document.getElementById('apellido').value = apellido;
  document.getElementById('fecha').value = fecha;

  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';

  boton.onclick = function(){
    var washingtonRef = db.collection("users").doc(id);

    // Guardando los datos de editados.
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

      return washingtonRef.update({
        first: nombre,
        last: apellido,
        born: fecha
      })
      .then(function() {
          //console.log("Document successfully updated!");
          boton.innerHTML = 'Guardar';
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    }
  }
