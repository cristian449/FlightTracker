export default (sequelize, DataTypes) => {
    return sequelize.define(
        "Flight",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            from: {
                type: DataTypes.STRING,
            },
            to: {
                type: DataTypes.STRING,
            },
            length: {
                type: DataTypes.STRING,
            },
             departureTime: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }
    );
};