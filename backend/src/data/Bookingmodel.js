export default (sequelize, DataTypes) => {
    return sequelize.define(
        "Booking",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            bookingdate: {
                type: DataTypes.DATE,
                allowNull: false,
                
            }
        }
    );
};
