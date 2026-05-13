'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    professorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'professors',
        key: 'id'
      }
    }
  }, {
    tableName: 'courses',
    timestamps: true
  });

  Course.associate = (models) => {
    Course.belongsTo(models.Professor, {
      foreignKey: 'professorId',
      as: 'professor'
    });

    Course.belongsToMany(models.Student, {
      through: models.Enrollment,
      foreignKey: 'courseId',
      as: 'students'
    });
  };

  return Course;
};
