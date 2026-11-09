const express = require('express');
const Evento = require('../models/evento');
const Recinto = require('../models/recinto');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const eventos = await Evento.find().populate('recinto');

        if (eventos.length === 0) {
            return res.status(500).json({
                ok: false,
                error: 'No se han encontrado eventos'
            });
        }

        res.status(200).json({
            ok: true,
            resultado: eventos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'No se han encontrado eventos'
        });
    }
});

router.get('/entradas/:idEvento/:tipoEntrada', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.idEvento);

        const entrada = evento
            ? evento.entradas.find(
                entrada => entrada.tipo === req.params.tipoEntrada
            )
            : null;

        if (!entrada) {
            return res.status(404).json({
                ok: false,
                error: `Error obteniendo datos de entrada para evento ${req.params.idEvento}`
            });
        }

        res.status(200).json({
            ok: true,
            resultado: {
                precio: entrada.precio,
                disponibles: entrada.disponibles
            }
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: `Error obteniendo datos de entrada para evento ${req.params.idEvento}`
        });
    }
});



router.get('/:id', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                error: `Evento ${req.params.id} no encontrado`
            });
        }

        res.status(200).json({
            ok: true,
            resultado: evento
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: `Evento ${req.params.id} no encontrado`
        });
    }
});

router.get('/localidad/:nombre', async (req, res) => {
    try {
        const recintos = await Recinto.find({
            localidad: req.params.nombre
        });

        const idsRecintos = recintos.map(recinto => recinto._id);

        const eventos = await Evento.find({
            recinto: { $in: idsRecintos },
            fecha: { $gte: new Date() }
        });

        if (eventos.length === 0) {
            return res.status(404).json({
                ok: false,
                error: 'No se han encontrado eventos'
            });
        }

        res.status(200).json({
            ok: true,
            resultado: eventos
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: 'No se han encontrado eventos'
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const evento = new Evento(req.body);
        const resultado = await evento.save();

        res.status(201).json({
            ok: true,
            resultado: resultado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'Error añadiendo evento'
        });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const evento = await Evento.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!evento) {
            return res.status(404).json({
                ok: false,
                error: `Error actualizando evento ${req.params.id}`
            });
        }

        res.status(200).json({
            ok: true,
            resultado: evento
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: `Error actualizando evento ${req.params.id}`
        });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                error: `Error eliminando evento ${req.params.id}`
            });
        }

        res.status(200).json({
            ok: true,
            resultado: evento
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: `Error eliminando evento ${req.params.id}`
        });
    }
});


router.put('/entradas/:idEvento/:tipoEntrada/:cantidad', async (req, res) => {
    try {
        const cantidad = Number(req.params.cantidad);

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            return res.status(404).json({
                ok: false,
                error: `Error actualizando entradas del evento ${req.params.idEvento}`
            });
        }

        const evento = await Evento.findOneAndUpdate(
            {
                _id: req.params.idEvento,
                entradas: {
                    $elemMatch: {
                        tipo: req.params.tipoEntrada,
                        disponibles: { $gte: cantidad }
                    }
                }
            },
            {
                $inc: {
                    'entradas.$.disponibles': -cantidad
                }
            },
            {
                returnDocument: 'after'
            }
        );

        if (!evento) {
            return res.status(404).json({
                ok: false,
                error: `Error actualizando entradas del evento ${req.params.idEvento}`
            });
        }

        res.status(200).json({
            ok: true,
            resultado: evento
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: `Error actualizando entradas del evento ${req.params.idEvento}`
        });
    }
});


module.exports = router;