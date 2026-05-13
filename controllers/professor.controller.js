const professorService = require('../services/professor.service');

class ProfessorController {
  async getAll(req, res) {
    try {
      const professors = await professorService.findAll(req.query);
      res.json(professors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const professor = await professorService.findById(req.params.id);
      res.json(professor);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const professor = await professorService.create(req.body);
      res.status(201).json(professor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const professor = await professorService.update(req.params.id, req.body);
      res.json(professor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async partialUpdate(req, res) {
    try {
      const professor = await professorService.partialUpdate(req.params.id, req.body);
      res.json(professor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await professorService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async bulkCreate(req, res) {
    try {
      const professors = await professorService.bulkCreate(req.body);
      res.status(201).json(professors);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async bulkUpdate(req, res) {
    try {
      const professors = await professorService.bulkUpdate(req.body);
      res.json(professors);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async bulkDelete(req, res) {
    try {
      const result = await professorService.bulkDelete(req.body.ids);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProfessorController();
