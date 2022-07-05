const router = require('express').Router(); //nos dice que la constate routes necesita del paquete express
const Joi = require('@hapi/joi').extend(require('@joi/date')); 
const Sorteo = require('../models/sorteo'); //aqui va a pedir que exporte sorteos.js en la constante sorteo


const sorteoSchema = Joi.object({ // va a crear una caja virtual o de cristal con los siguientes datos.
   
    nombre: Joi.string().min(2).max(255).required(),
    costo: Joi.number().min(1).max(1000000).required(),
    descripcion: Joi.string().min(2).max(255).required(),
    inicio: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required(),
    final: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required()
})

router.post('/', async (req, res) => {  //se crea un router basado en post el cual va a validad que la caja de cristal tenga todos los datos
    const { error } = sorteoSchema.validate(req.body) //aqui se encarga de comparar si los datos son correctos 
    
    if (error) { //en caso de que los datos de la caja de cristal no sean correctos marca el error 400
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }    
    const sorteo = new Sorteo({ //posterior a la validación de la caja de cristal donde los datos fueron correctos

        nombre: req.body.nombre,
        costo: req.body.costo,
        descripcion: req.body.descripcion,
        fechaInicio: req.body.inicio,
        fechaFinal: req.body.final,
        
    });

    try { //ya que se validaron correctamente los datos se guardan en le base de datos
        const saveSorteo= await sorteo.save();
        res.json({
            error: null,
            data: saveSorteo
        })
    } catch (error) { //si se validaron y aun existe algun error o inconveniente este proceso se rompre y despliega el error 400
        res.status(400).json({error})
    }       
})
router.delete('/:id', async (req, res) => { //aqui va a buscar el id que se crea la guardar cada schema
    const id = req.params.id;  
    console.log('id desde backend', id)
    try {

        const sorteoDB = await Sorteo.findByIdAndDelete({ _id: id }); //aqui va a la base de datos y busca que el id correspondiente si se encuentre o exista.
        console.log(sorteoDB)
       
            if (!sorteoDB) { //en caso de que este id no exita va imprimer el mensaje de que no se puede imprimir
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else { // si el id existe se van a borrar todos los datos de ese schema o que esten contenidos con ese id
            res.json({
                estado: true,
                mensaje: 'sorteo eliminado!'
            })
        }
    } catch (error) { // si no coincide el id o no se encuentra el proceso se fractura o quiebra e imprime el error 400 
        console.log(error)
   }
})

router.put('/:id', async (req, res) => { // router va usar el metodo put y va crear una en sorteo con el id
    const id = req.params.id; // va a requerir los datos que se encuentren en el id especifico de la ruta sorteos
    const body = req.body; //la constante body va recuperar los datos del cuerpo del id antes señalado

    const { error } = sorteoSchema.validate(body) //aqui se va almacenar de manera vitual los datos contenidos para ser validados
    
    if (error) { //si exite un error en el id o datos almacenado este va a tronanar el proceso y se queda en el error 400, pero si todos los 
        return res.status(400).json( // datos son correctos continua.
            {error: error.details[0].message}
        )
    }    
    console.log(id)
    console.log('body', body)

    const sorteo = { //guardando nuevamente los datos de ese id en los siguientes paramatros para posteriormente ser modificados.

        nombre: body.nombre,
        costo: body.costo,
        descripcion: body.descripcion,
        fechaInicio: body.inicio,
        fechaFinal: body.final,

    };

    try {
        const sorteoDB = await Sorteo.findByIdAndUpdate( // ya que se llenaron los datos correspondientes los busca el id y los sube a la base de datos, y los modifica p actualiza
            id, sorteo, { useFindAndModify: false } // y los modifica o actualiza
        )
        console.log(sorteoDB) //si el proceso fue exitoso imprime la leyenda "editao"
        res.json({
            estado: true,
            mensaje: 'editado'
        })
    } catch (error) { //si el proceso fue erroneo imprime la leyenda "Fallo Modificación"
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Fallo modificacion'
        })
    }
})

module.exports = router;
