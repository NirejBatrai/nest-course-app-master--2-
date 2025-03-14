import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'customer',
  timestamps: false,
})
export class Customer extends Model {
  @Column({ type: DataType.STRING(200), allowNull: false })
  fullname: string;

  @Column({})
  isActive: boolean;
}
