import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'userInfo',
  timestamps: false,
})
export class UserInfo extends Model {
  @Column({})
  firstname: string;
  @Column({})
  lastname: string;
  @Column({})
  age: number;
  @Column({})
  hobby: string;

  @Column({})
  isActive: boolean;
}
