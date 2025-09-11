import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' , timestamps: false})
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  email: string;
}
