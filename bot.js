const {Telegraf} = require('telegraf');

const funciones = require('./functions/combinaciones');

const  {conocimiento} =  require('./conversations/conocimiento.json'); 


const bot = new Telegraf('5065236815:AAGEdgbxqPNTRmU_o7L_SxKy6jWRtpGM-So');

/* Cuando se ejecuta el comando "/start en el bot" */
bot.start( (ctx)=>{
    console.log(ctx.from)
    ctx.reply(`Bienvenido al chat de herbolaria ${ctx.from.first_name}, prueba /help`)
})

/*Comando HELP */
bot.help( (ctx)=>{
    ctx.reply(`Hola, soy un chat de herbolaria, puedo ayudarte resolviendo algunas dudas si escribes /preguntas 
    o si preguntas alguna cosa de la que tenga conocimiento \nTambién puedes escribir /paginas para
    brindarte páginas con información útil
    \nIncluso puedes escribir "curiosidades de las plantas" ó "curiosidades" para conocer alguna `)
})

bot.settings( (ctx)=>{
    ctx.reply('Aquí va la configuracion')
})

/*TEXTOS en especifico */
bot.hears(['hola','Hola'], (ctx) =>{
    text = "Hey! Estoy para ayudarte :) puedo \n A) Brindarte información sobre plantas medicinales  \n B) Hacer un poco de platica ";
    text+="\nPrueba el comando /help para brindarte ayuda" 
    ctx.reply(text)
})

conocimiento.forEach(preguntas=>{ 
    //console.log(preguntas.pregunta+ '  '+ preguntas.respuesta)
    bot.hears(preguntas.pregunta+'',(ctx)=>{
        ctx.reply(preguntas.respuesta+'')
    })
})
bot.hears(['curiosidades','Curiosidades','curiosidades de las plantas','Curiosidades de las plantas'], (ctx)=>{
    ctx.reply(`Aquí una curiosidad:\n${funciones.curiosidad()}`)
})


/* bot.on('text', (ctx) => {
    // Explicit usage
    ctx.telegram.sendMessage(ctx.message.chat.id, `HOla! algunos comandos son`)

    // Using context shortcut
    //ctx.reply(`Hello ${ctx.state.role}`)
})
 */


/** Comandos personalizados */

bot.command('paginas',(ctx)=>{
   /*  ctx.reply('My custom command') */
   ctx.telegram.sendMessage(ctx.chat.id,'<i>Estamos en</i> <b>construccion</b>',
    {
        reply_markup:{
            inline_keyboard:[
                //fila 1
                [{text:"Botánica", url:"https://es.wikipedia.org/wiki/Bot%C3%A1nica"}],
                    //fila 2
                [{text:"Plantas medicinales", url:"https://www.gob.mx/semarnat/articulos/plantas-medicinales-de-mexico?idiom=es"},
                {text:"Plantas para la ansiedad", url:"https://www.mayoclinic.org/es-es/diseases-conditions/generalized-anxiety-disorder/expert-answers/herbal-treatment-for-anxiety/faq-20057945"},],
                    //fila 3
                [{text:"Curiosidades de plantas", url:"https://www.ecologiaverde.com/curiosidades-de-las-plantas-3535.html"},
                {text:"5", url:"www.mediavida.com"}, //pendiente
                {text:"6", url:"www.mediavida.com"}],//pendiente
                    
                
            ]
        },
        parse_mode:"HTML",
    })
})

bot.command(["preguntas","Preguntas","pReguntas"],(ctx)=>{
    
    //Obtiene las preguntas aleatorias
    const preguntas = funciones.botones(); 

    ctx.reply("Algunas preguntas que podrías hacer",
    {   
        reply_markup:{
        
            keyboard:[
                preguntas
            ]
        }
    }
    )
})



/* Menciones */
bot.mention('BotFather',(ctx)=>{

})

bot.phone('+525572130415', ctxt=>{

})

bot.hashtag('programming',ctxt=>{
    ctx.reply('Bot programado')
})

/*EVENTOS */
bot.on('sticker', (ctx) => ctx.reply('👍')); 

bot.on('text',ctx=>{
    // Aqui debemos hacer el random de las preguntas que queremos 
    ctx.reply('Puedes probar el comando /help')
}) 

/* Cuando se ejecute el bot*/
bot.launch()