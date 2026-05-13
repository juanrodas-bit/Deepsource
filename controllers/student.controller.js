const studentService = require('../services/student.service');

class StudentController {
  async getAll(req, res) {
    try {
      const students = await studentService.findAll(req.query);
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const student = await studentService.findById(req.params.id);
      res.json(student);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const student = await studentService.create(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const student = await studentService.update(req.params.id, req.body);
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async partialUpdate(req, res) {
    try {
      const student = await studentService.partialUpdate(req.params.id, req.body);
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await studentService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async bulkCreate(req, res) {
    try {
      const students = await studentService.bulkCreate(req.body);
      res.status(201).json(students);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async bulkUpdate(req, res) {
    try {
      const students = await studentService.bulkUpdate(req.body);
      res.json(students);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async bulkDelete(req, res) {
    try {
      // body: { ids: [1, 2, 3] }
      const result = await studentService.bulkDelete(req.body.ids);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new StudentController();
