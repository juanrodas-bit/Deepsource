const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');

// ── Bulk routes (deben ir ANTES de /:id para evitar conflictos) ──
// POST   /api/enrollments/bulk
router.post('/bulk', enrollmentController.bulkCreate);

// PUT    /api/enrollments/bulk
router.put('/bulk', enrollmentController.bulkUpdate);

// DELETE /api/enrollments/bulk  body: { ids: [1,2,3] }
router.delete('/bulk', enrollmentController.bulkDelete);

// ── CRUD individual ──────────────────────────────────────────────
// GET /api/enrollments?studentId=1&courseId=2&notaMin=3.0&notaMax=5.0&limit=10&offset=0
router.get('/', enrollmentController.getAll);

// GET /api/enrollments/:id
router.get('/:id', enrollmentController.getById);

// POST /api/enrollments
router.post('/', enrollmentController.create);

// PUT /api/enrollments/:id
router.put('/:id', enrollmentController.update);

// PATCH /api/enrollments/:id
router.patch('/:id', enrollmentController.partialUpdate);

// DELETE /api/enrollments/:id
router.delete('/:id', enrollmentController.delete);

module.exports = router;
