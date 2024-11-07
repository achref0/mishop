const db = require('../config/db');

class Product {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows.map(product => ({ ...product, price: parseFloat(product.price) }));
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    if (rows[0]) {
      rows[0].price = parseFloat(rows[0].price); // Ensure price is a number
    }
    return rows[0];
  }

  static async create({ name, description, price, image }) {
    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
      [name, description, price, image]
    );
    return { id: result.insertId, name, description, price, image };
  }

  static async update(id, { name, description, price, image }) {
    const [result] = await db.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?',
      [name, description, price, image, id]
    );
    if (result.affectedRows === 0) return null;
    return { id, name, description, price, image };
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Product;