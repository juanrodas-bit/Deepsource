const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

// ── Bulk routes (deben ir ANTES de /:id para evitar conflictos) ──
// POST   /api/students/bulk
router.post('/bulk', studentController.bulkCreate);

// PUT    /api/students/bulk
router.put('/bulk', studentController.bulkUpdate);

// DELETE /api/students/bulk  body: { ids: [1,2,3] }
router.delete('/bulk', studentController.bulkDelete);

// ── CRUD individual ──────────────────────────────────────────────
// GET /api/students?nombre=Juan&limit=10&offset=0
router.get('/', studentController.getAll);

// GET /api/students/:id
router.get('/:id', studentController.getById);

// POST /api/students
router.post('/', studentController.create);

// PUT /api/students/:id
router.put('/:id', studentController.update);

// PATCH /api/students/:id
router.patch('/:id', studentController.partialUpdate);

// DELETE /api/students/:id
router.delete('/:id', studentController.delete);

module.exports = router;
