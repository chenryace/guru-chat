import { DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';

import { AssociableModelStatic } from './index';
import { Message } from './Message';

export interface User extends Model {
    readonly id: string;
    readonly username: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    getMessages: HasManyGetAssociationsMixin<Message>;
}

export type UserStatic = AssociableModelStatic<User>;

export const initUser = (sequelize: Sequelize): UserStatic => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            get(this: User) {
                return ((this.getDataValue('id') as unknown) as number).toString();
            },
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }) as UserStatic;

    User.associate = database => {
        User.hasMany(database.Message, { as: 'messages', foreignKey: 'senderId' });
    };

    return User;
};
