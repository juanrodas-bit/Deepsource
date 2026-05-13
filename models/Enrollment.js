'use strict';

module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      }
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    notaFinal: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
      validate: {
        min: 0,
        max: 5
      }
    }
  }, {
    tableName: 'enrollments',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['studentId', 'courseId']
      }
    ]
  });

  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student',
      onDelete: 'CASCADE'
    });

    Enrollment.belongsTo(models.Course, {
      foreignKey: 'courseId',
      as: 'course',
      onDelete: 'CASCADE'
    });
  };

  return Enrollment;
};
