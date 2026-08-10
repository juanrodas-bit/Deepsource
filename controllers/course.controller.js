const courseService = require('../services/course.service');

class CourseController {
  static async getAll(req, res) {
    try {
      const courses = await courseService.findAll(req.query);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const course = await courseService.findById(req.params.id);
      res.json(course);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const course = await courseService.create(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const course = await courseService.update(req.params.id, req.body);
      res.json(course);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async partialUpdate(req, res) {
    try {
      const course = await courseService.partialUpdate(req.params.id, req.body);
      res.json(course);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const result = await courseService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async bulkCreate(req, res) {
    try {
      const courses = await courseService.bulkCreate(req.body);
      res.status(201).json(courses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async bulkUpdate(req, res) {
    try {
      const courses = await courseService.bulkUpdate(req.body);
      res.json(courses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async bulkDelete(req, res) {
    try {
      const result = await courseService.bulkDelete(req.body.ids);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CourseController();
