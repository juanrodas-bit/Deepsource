'use strict';

module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
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
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'professors',
    timestamps: true
  });

  Professor.associate = (models) => {
    Professor.hasMany(models.Course, {
      foreignKey: 'professorId',
      as: 'courses'
    });
  };

  return Professor;
};
