const { Course, Professor, Student } = require('../models');
const { Op } = require('sequelize');

class CourseService {
  async findAll(queryParams = {}) {
    const { nombre, codigo, professorId, limit, offset } = queryParams;
    
    const where = {};
    if (nombre) {
      where.nombre = { [Op.iLike]: `%${nombre}%` };
    }
    if (codigo) {
      where.codigo = { [Op.iLike]: `%${codigo}%` };
    }
    if (professorId) {
      where.professorId = professorId;
    }

    const options = {
      where,
      include: [
        { model: Professor, as: 'professor' },
        { 
          model: Student, 
          as: 'students',
          through: { attributes: ['notaFinal', 'id'] }
        }
      ]
    };

    if (limit) options.limit = parseInt(limit);
    if (offset) options.offset = parseInt(offset);

    return await Course.findAll(options);
  }

  async findById(id) {
    const course = await Course.findByPk(id, {
      include: [
        { model: Professor, as: 'professor' },
        { 
          model: Student, 
          as: 'students',
          through: { attributes: ['notaFinal', 'id'] }
        }
      ]
    });

    if (!course) {
      throw new Error('Curso no encontrado');
    }

    return course;
  }

  async create(data) {
    return await Course.create(data);
  }

  async update(id, data) {
    const course = await Course.findByPk(id);
    
    if (!course) {
      throw new Error('Curso no encontrado');
    }

    return await course.update(data);
  }

  async partialUpdate(id, data) {
    const course = await Course.findByPk(id);
    
    if (!course) {
      throw new Error('Curso no encontrado');
    }

    return await course.update(data);
  }

  async delete(id) {
    const course = await Course.findByPk(id);
    
    if (!course) {
      throw new Error('Curso no encontrado');
    }

    await course.destroy();
    return { message: 'Curso eliminado exitosamente' };
  }

  // ── Bulk operations ──────────────────────────────────────────────

  async bulkCreate(records) {
    return await Course.bulkCreate(records, { validate: true });
  }

  async bulkUpdate(updates) {
    const results = await Promise.all(
      updates.map(async ({ id, ...data }) => {
        const course = await Course.findByPk(id);
        if (!course) throw new Error(`Curso con id ${id} no encontrado`);
        return await course.update(data);
      })
    );
    return results;
  }

  async bulkDelete(ids) {
    const deleted = await Course.destroy({ where: { id: ids } });
    return { message: `${deleted} curso(s) eliminado(s)` };
  }
}

module.exports = new CourseService();
