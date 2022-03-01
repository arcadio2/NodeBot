
const  conocimiento =  require('../conversations/conocimiento.json'); 

const funciones = {}
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

funciones.procesado = (texto)=>{
    let abc = ['a','b','c','d','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
    let mayusculas = ['A','B','C','D','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let signos = ['!','?','¿'];


    let posibles = []; 

    posibles.push(texto.toLowerCase())
    posibles.push(texto.toUpperCase())
    /* posibles.push(texto.) */


}


module.exports = funciones; 
