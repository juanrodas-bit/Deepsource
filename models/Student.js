'use strict';

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    tableName: 'students',
    timestamps: true
  });

  Student.associate = (models) => {
    Student.belongsToMany(models.Course, {
      through: models.Enrollment,
      foreignKey: 'studentId',
      as: 'courses'
    });
  };

  return Student;
};
