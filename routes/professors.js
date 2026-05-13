const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professor.controller');

// ── Bulk routes (deben ir ANTES de /:id para evitar conflictos) ──
// POST   /api/professors/bulk
router.post('/bulk', professorController.bulkCreate);

// PUT    /api/professors/bulk
router.put('/bulk', professorController.bulkUpdate);

// DELETE /api/professors/bulk  body: { ids: [1,2,3] }
router.delete('/bulk', professorController.bulkDelete);

// ── CRUD individual ──────────────────────────────────────────────
// GET /api/professors?nombre=Juan&especialidad=Matemáticas&limit=10&offset=0
router.get('/', professorController.getAll);

// GET /api/professors/:id
router.get('/:id', professorController.getById);

// POST /api/professors
router.post('/', professorController.create);

// PUT /api/professors/:id
router.put('/:id', professorController.update);

// PATCH /api/professors/:id
router.patch('/:id', professorController.partialUpdate);

// DELETE /api/professors/:id
router.delete('/:id', professorController.delete);

module.exports = router;
