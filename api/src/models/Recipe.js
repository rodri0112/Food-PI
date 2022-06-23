const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["main dish"]
    },
    image: {
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  });
};
