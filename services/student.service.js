const { Student, Course } = require('../models');
const { Op } = require('sequelize');

class StudentService {
  static async findAll(queryParams = {}) {
    const { nombre, correo, page, pageSize } = queryParams;

    const parsedPage     = parseInt(page)     || 1;
    const parsedPageSize = parseInt(pageSize) || 10;
    const offset         = (parsedPage - 1) * parsedPageSize;

    const where = {};
    if (nombre) {
      where.nombre = { [Op.iLike]: `%${nombre}%` };
    }
    if (correo) {
      where.correo = { [Op.iLike]: `%${correo}%` };
    }

    const { count, rows } = await Student.findAndCountAll({
      where,
      include: [{
        model: Course,
        as: 'courses',
        through: { attributes: ['notaFinal', 'id'] }
      }],
      limit:  parsedPageSize,
      offset,
      distinct: true, // necesario para que count sea correcto con includes
    });

    return {
      data: rows,
      pagination: {
        total:      count,
        page:       parsedPage,
        pageSize:   parsedPageSize,
        totalPages: Math.ceil(count / parsedPageSize),
      },
    };
  }

  async findById(id) {
    const student = await Student.findByPk(id, {
      include: [{
        model: Course,
        as: 'courses',
        through: { attributes: ['notaFinal', 'id'] }
      }]
    });

    if (!student) {
      throw new Error('Estudiante no encontrado');
    }

    return student;
  }

  async create(data) {
    return await Student.create(data);
  }

  async update(id, data) {
    const student = await Student.findByPk(id);
    
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }

    return await student.update(data);
  }

  static async partialUpdate(id, data) {
    const student = await Student.findByPk(id);
    
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }

    return await student.update(data);
  }

  static async delete(id) {
    const student = await Student.findByPk(id);
    
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }

    await student.destroy();
    return { message: 'Estudiante eliminado exitosamente' };
  }

  // ── Bulk operations ──────────────────────────────────────────────

  static async bulkCreate(records) {
    // ignoreDuplicates evita error si el correo ya existe
    return await Student.bulkCreate(records, {
      validate: true,
      ignoreDuplicates: false,
    });
  }

  static async bulkUpdate(updates) {
    // updates: [{ id, ...fields }]
    const results = await Promise.all(
      updates.map(async ({ id, ...data }) => {
        const student = await Student.findByPk(id);
        if (!student) throw new Error(`Estudiante con id ${id} no encontrado`);
        return await student.update(data);
      })
    );
    return results;
  }

  static async bulkDelete(ids) {
    const deleted = await Student.destroy({ where: { id: ids } });
    return { message: `${deleted} estudiante(s) eliminado(s)` };
  }
}

module.exports = new StudentService();
