let campos =  document.querySelectorAll('.form-control');
/* campos = [
     document.querySelectorAll('#data'),
      document.querySelectorAll('#quantidade'),
       document.querySelectorAll('#valor');
];
*/
console.log(campos);
let tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    let tr = document.createElement('tr');

    campos.forEach((element) => {
        let td = document.createElement('td');
        td.textContent = element.value;
        tr.appendChild(td);
    });

    let volume = document.createElement('td');
    volume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(volume);
    tbody.appendChild(tr);

    campos[0].value = null;
    campos[1].value = 1;
    campos[2].value = 0.0;

    campos[0].focus();

});