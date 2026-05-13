const { Professor, Course } = require('../models');
const { Op } = require('sequelize');

class ProfessorService {
  async findAll(queryParams = {}) {
    const { nombre, especialidad, limit, offset } = queryParams;
    
    const where = {};
    if (nombre) {
      where.nombre = { [Op.iLike]: `%${nombre}%` };
    }
    if (especialidad) {
      where.especialidad = { [Op.iLike]: `%${especialidad}%` };
    }

    const options = {
      where,
      include: [{ model: Course, as: 'courses' }]
    };

    if (limit) options.limit = parseInt(limit);
    if (offset) options.offset = parseInt(offset);

    return await Professor.findAll(options);
  }

  async findById(id) {
    const professor = await Professor.findByPk(id, {
      include: [{ model: Course, as: 'courses' }]
    });

    if (!professor) {
      throw new Error('Profesor no encontrado');
    }

    return professor;
  }

  async create(data) {
    return await Professor.create(data);
  }

  async update(id, data) {
    const professor = await Professor.findByPk(id);
    
    if (!professor) {
      throw new Error('Profesor no encontrado');
    }

    return await professor.update(data);
  }

  async partialUpdate(id, data) {
    const professor = await Professor.findByPk(id);
    
    if (!professor) {
      throw new Error('Profesor no encontrado');
    }

    return await professor.update(data);
  }

  async delete(id) {
    const professor = await Professor.findByPk(id);
    
    if (!professor) {
      throw new Error('Profesor no encontrado');
    }

    await professor.destroy();
    return { message: 'Profesor eliminado exitosamente' };
  }

  // ── Bulk operations ──────────────────────────────────────────────

  async bulkCreate(records) {
    return await Professor.bulkCreate(records, { validate: true });
  }

  async bulkUpdate(updates) {
    const results = await Promise.all(
      updates.map(async ({ id, ...data }) => {
        const professor = await Professor.findByPk(id);
        if (!professor) throw new Error(`Profesor con id ${id} no encontrado`);
        return await professor.update(data);
      })
    );
    return results;
  }

  async bulkDelete(ids) {
    const deleted = await Professor.destroy({ where: { id: ids } });
    return { message: `${deleted} profesor(es) eliminado(s)` };
  }
}

module.exports = new ProfessorService();
