
const  { conocimiento } =  require('../conversations/conocimiento.json'); 

const {curiosidades} =  require('../conversations/conocimiento.json'); 
const {plantas} =  require('../conversations/conocimiento.json'); 



const funciones = {
}



funciones.botones = () =>{
    let preguntas = []; 

    let aleatorios = []; 

    for(let i=0; i<4; i++){
        let aleatorio = Math.floor(Math.random() * conocimiento.length)
        
        /* Validar que no se repitan las mismas pregutnas */
        while(aleatorios.includes(aleatorio)){
            aleatorio = Math.floor(Math.random() * conocimiento.length)
        }
        //agregamos los indices
        aleatorios.push(aleatorio)
        //añadimos las preguntas con base a los indices (no repetidos)
        preguntas.push({ text: conocimiento[aleatorios[i]].pregunta })
    }
    

    console.log(preguntas)
    return preguntas;
}

funciones.curiosidad = ()=>{
    let aleatorio = Math.floor(Math.random() * curiosidades.length)

    return curiosidades[aleatorio];
} 
funciones.descPlantas = ()=>{
    let aleatorio = Math.floor(Math.random() * plantas.length)

    return plantas[aleatorio];
}


//-
funciones.procesado = (texto)=>{ //posicion si la aumenta
    /*let abc = ['a','b','c','d','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
    let mayusculas = ['A','B','C','D','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let signos = ['!','?','¿'];*/

    let lista = toProcess(texto,[],0)
    return lista;
    
}

function toProcess(texto, posibles , posicion){
    if (posicion < texto.length) {
        /* console.log(texto);
        console.log(posicion) //prueba dando al bot /preguntas
        console.log(texto[posicion]) */
        let nuevo_texto = texto.slice(0,posicion) + texto[posicion].toLowerCase() + texto.slice(posicion+1,texto.length) 
        //posibles.push(nuevo_texto)
        //texto[posicion] = texto[posicion].toLowerCase();

        //posibles.push(texto)
        posibles = toProcess(nuevo_texto, posibles, posicion+1);

        let nuevo_texto_2 = texto.slice(0,posicion) + texto[posicion].toUpperCase() + texto.slice(posicion+1,texto.length) 
        //texto[posicion] = texto[posicion].toUpperCase();
        //posibles.push(nuevo_texto_2)
        posibles = toProcess(nuevo_texto_2, posibles, posicion+1); 
        
    } else { 
        posibles.push(texto); //menos en preguntas muy largas porque es o(2^n)
        //ps mientras en curiosidades y en eso, igual yo creo agregare una de plantas. siigueme como??. 
        //en la parte izquierda en la extension, le das click a mi bolita ya
    }   
    return posibles;

}


module.exports = funciones; 
