import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: true }) // ✅ Renamed to "products" (plural for consistency)
export class Product extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string; // ✅ Fixed type casing (should be lowercase `string`)

  @Column({
    type: DataType.TEXT,
    allowNull: true, // ✅ Allow null for optional description
  })
  description: string; // ✅ Fixed typo from "descrption" → "description"

  @Column({
    type: DataType.DECIMAL(10, 2), // ✅ Corrected precision & scale
    allowNull: false,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  stock: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING), // ✅ Proper Sequelize array type
    allowNull: true,
  })
  images: string[];
}
