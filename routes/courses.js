const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

// ── Bulk routes (deben ir ANTES de /:id para evitar conflictos) ──
// POST   /api/courses/bulk
router.post('/bulk', courseController.bulkCreate);

// PUT    /api/courses/bulk
router.put('/bulk', courseController.bulkUpdate);

// DELETE /api/courses/bulk  body: { ids: [1,2,3] }
router.delete('/bulk', courseController.bulkDelete);

// ── CRUD individual ──────────────────────────────────────────────
// GET /api/courses?nombre=Cálculo&codigo=MAT&professorId=1&limit=10&offset=0
router.get('/', courseController.getAll);

// GET /api/courses/:id
router.get('/:id', courseController.getById);

// POST /api/courses
router.post('/', courseController.create);

// PUT /api/courses/:id
router.put('/:id', courseController.update);

// PATCH /api/courses/:id
router.patch('/:id', courseController.partialUpdate);

// DELETE /api/courses/:id
router.delete('/:id', courseController.delete);

module.exports = router;
