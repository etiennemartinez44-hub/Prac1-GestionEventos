const express = require('express');
const Recinto = require('../models/recinto');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recintos = await Recinto.find();

        if (recintos.length === 0) {
            return res.status(500).json({
                ok: false,
                error: 'No se han encontrado recintos'
            });
        }

        res.status(200).json({
            ok: true,
            resultado: recintos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'No se han encontrado recintos'
        });
    }
});

router.get('/localidad/:nombre', async (req, res) => {
    try {
        const recintos = await Recinto.find({
            localidad: req.params.nombre
        });

        if (recintos.length === 0) {
            return res.status(404).json({
                ok: false,
                error: 'No se han encontrado recintos de la localidad indicada'
            });
        }

        res.status(200).json({
            ok: true,
            resultado: recintos
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: 'No se han encontrado recintos de la localidad indicada'
        });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const recinto = await Recinto.findById(req.params.id);

        if (!recinto) {
            return res.status(404).json({
                ok: false,
                error: `Recinto ${req.params.id} no encontrado`
            });
        }

        res.status(200).json({
            ok: true,
            resultado: recinto
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: `Recinto ${req.params.id} no encontrado`
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const recinto = new Recinto(req.body);
        const resultado = await recinto.save();

        res.status(201).json({
            ok: true,
            resultado: resultado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'Error añadiendo recinto'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const recinto = await Recinto.findByIdAndDelete(req.params.id);

        if (!recinto) {
            return res.status(404).json({
                ok: false,
                error: `Error eliminando recinto ${req.params.id}`
            });
        }

        res.status(200).json({
            ok: true,
            resultado: recinto
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: `Error eliminando recinto ${req.params.id}`
        });
    }
});



module.exports = router;