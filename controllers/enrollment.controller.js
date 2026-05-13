const enrollmentService = require('../services/enrollment.service');

class EnrollmentController {
  async getAll(req, res) {
    try {
      const enrollments = await enrollmentService.findAll(req.query);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const enrollment = await enrollmentService.findById(req.params.id);
      res.json(enrollment);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const enrollment = await enrollmentService.create(req.body);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const enrollment = await enrollmentService.update(req.params.id, req.body);
      res.json(enrollment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async partialUpdate(req, res) {
    try {
      const enrollment = await enrollmentService.partialUpdate(req.params.id, req.body);
      res.json(enrollment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await enrollmentService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async bulkCreate(req, res) {
    try {
      const enrollments = await enrollmentService.bulkCreate(req.body);
      res.status(201).json(enrollments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async bulkUpdate(req, res) {
    try {
      const enrollments = await enrollmentService.bulkUpdate(req.body);
      res.json(enrollments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async bulkDelete(req, res) {
    try {
      const result = await enrollmentService.bulkDelete(req.body.ids);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new EnrollmentController();
