const { Enrollment, Student, Course, Professor } = require('../models');
const { Op } = require('sequelize');

class EnrollmentService {
  async findAll(queryParams = {}) {
    const { studentId, courseId, notaMin, notaMax, limit, offset } = queryParams;
    
    const where = {};
    if (studentId) {
      where.studentId = studentId;
    }
    if (courseId) {
      where.courseId = courseId;
    }
    if (notaMin || notaMax) {
      where.notaFinal = {};
      if (notaMin) where.notaFinal[Op.gte] = parseFloat(notaMin);
      if (notaMax) where.notaFinal[Op.lte] = parseFloat(notaMax);
    }

    const options = {
      where,
      include: [
        { model: Student, as: 'student' },
        { 
          model: Course, 
          as: 'course',
          include: [{ model: Professor, as: 'professor' }]
        }
      ]
    };

    if (limit) options.limit = parseInt(limit);
    if (offset) options.offset = parseInt(offset);

    return await Enrollment.findAll(options);
  }

  async findById(id) {
    const enrollment = await Enrollment.findByPk(id, {
      include: [
        { model: Student, as: 'student' },
        { 
          model: Course, 
          as: 'course',
          include: [{ model: Professor, as: 'professor' }]
        }
      ]
    });

    if (!enrollment) {
      throw new Error('Matrícula no encontrada');
    }

    return enrollment;
  }

  async create(data) {
    // Verificar que el estudiante existe
    const student = await Student.findByPk(data.studentId);
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }

    // Verificar que el curso existe
    const course = await Course.findByPk(data.courseId);
    if (!course) {
      throw new Error('Curso no encontrado');
    }

    return await Enrollment.create(data);
  }

  async update(id, data) {
    const enrollment = await Enrollment.findByPk(id);
    
    if (!enrollment) {
      throw new Error('Matrícula no encontrada');
    }

    return await enrollment.update(data);
  }

  async partialUpdate(id, data) {
    const enrollment = await Enrollment.findByPk(id);
    
    if (!enrollment) {
      throw new Error('Matrícula no encontrada');
    }

    return await enrollment.update(data);
  }

  async delete(id) {
    const enrollment = await Enrollment.findByPk(id);
    
    if (!enrollment) {
      throw new Error('Matrícula no encontrada');
    }

    await enrollment.destroy();
    return { message: 'Matrícula eliminada exitosamente' };
  }

  // ── Bulk operations ──────────────────────────────────────────────

  async bulkCreate(records) {
    // Validar que todos los studentId y courseId existen
    const studentIds = [...new Set(records.map(r => r.studentId))];
    const courseIds  = [...new Set(records.map(r => r.courseId))];

    const students = await Student.findAll({ where: { id: studentIds } });
    if (students.length !== studentIds.length) {
      throw new Error('Uno o más estudiantes no existen');
    }

    const courses = await Course.findAll({ where: { id: courseIds } });
    if (courses.length !== courseIds.length) {
      throw new Error('Uno o más cursos no existen');
    }

    return await Enrollment.bulkCreate(records, { validate: true });
  }

  async bulkUpdate(updates) {
    const results = await Promise.all(
      updates.map(async ({ id, ...data }) => {
        const enrollment = await Enrollment.findByPk(id);
        if (!enrollment) throw new Error(`Matrícula con id ${id} no encontrada`);
        return await enrollment.update(data);
      })
    );
    return results;
  }

  async bulkDelete(ids) {
    const deleted = await Enrollment.destroy({ where: { id: ids } });
    return { message: `${deleted} matrícula(s) eliminada(s)` };
  }
}

module.exports = new EnrollmentService();
