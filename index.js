const imagenes = [
    'imagen-0', 'imagen-1', 'imagen-2',
    'imagen-3', 'imagen-4', 'imagen-5',
    'imagen-6', 'imagen-7', 'imagen-8'
];

const puzzle = document.getElementById('puzzle');
const piezas = document.getElementById('piezas');

let terminado = imagenes.length;

while(imagenes.length) {
    const index = Math.floor(Math.random() * imagenes.length);
    const div = document.createElement('div');
    div.className = ('pieza');
    div.id = imagenes[index];
    div.draggable = true;
    div.style.backgroundImage = `url("img/${imagenes[index]}.jpg")`;
    piezas.appendChild(div);
    imagenes.splice(index, 1);
}

for(let i= 0; i < terminado; i++){
    const div = document.createElement('div');
    div.className = 'placeholder';
    div.dataset.id = i;
    puzzle.appendChild(div);
}

piezas.addEventListener('dragstart', event => {
    event.dataTransfer.setData('id', event.target.id);
});

puzzle.addEventListener('dragover', event => {
    event.preventDefault();
    event.target.classList.add('hover');
});

puzzle.addEventListener('dragleave', event => {
    event.target.classList.remove('hover');
});

puzzle.addEventListener('drop', event => {
    event.target.classList.remove('hover');

    const id = event.dataTransfer.getData('id');
    const numero = id.split('-')[1];

    console.log(id)
    console.log(numero)
    console.log(event.target.dataset.id)

    if(event.target.dataset.id === numero) {
        event.target.appendChild(document.getElementById(id));

        terminado--;

        if(terminado === 0){
            document.body.classList.add('ganaste');
        }
    }
});