import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  price: number;

  @Column
  description: string;

  @Column
  imageUrl: string;

  @Column({ defaultValue: true })
  inStock: boolean;
}
