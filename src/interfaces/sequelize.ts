import { Model } from 'sequelize';

import { KeysByType } from './common';

export type SerializedModel<TModel extends Model> = Omit<TModel, keyof Model | KeysByType<TModel, Function>>;
