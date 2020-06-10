import { BelongsToGetAssociationMixin, DataTypes, Model, Sequelize } from 'sequelize';

import { AssociableModelStatic } from './index';
import { User } from './User';

export interface Message extends Model {
    readonly id: string;
    readonly senderId: string;
    readonly message: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date;

    getSender: BelongsToGetAssociationMixin<User>;
}

export type MessageStatic = AssociableModelStatic<Message>;

export const initMessage = (sequelize: Sequelize): MessageStatic => {
    const Message = sequelize.define(
        'Message',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                get(this: Message) {
                    return ((this.getDataValue('id') as unknown) as number).toString();
                },
            },

            senderId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                get(this: Message) {
                    return ((this.getDataValue('senderId') as unknown) as number).toString();
                },
            },

            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            paranoid: true,
            indexes: [{ name: 'createdAt', using: 'BTREE', fields: [{ name: 'createdAt', order: 'DESC' }] }],
        },
    ) as MessageStatic;

    Message.associate = database => {
        Message.belongsTo(database.User, { as: 'sender' });
    };

    return Message;
};
