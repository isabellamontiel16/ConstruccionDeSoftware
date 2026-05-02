const pool   = require('../util/database.js');
const bcrypt = require('bcryptjs');

exports.User = class {
    constructor(username, name, password) {
        this.username = username;
        this.name     = name;
        this.password = password;
    }

    async save() {
        const hashedPass = await bcrypt.hash(this.password, 12);
        const sql = `INSERT INTO users (username, name, password)
                     VALUES ($1, $2, $3)
                     RETURNING id, username, name`;
        const { rows } = await pool.query(sql, [this.username, this.name, hashedPass]);
        return rows[0];
    }

    static async findByUsername(username) {
        const sql = `SELECT id, username, name, password
                     FROM users WHERE username = $1`;
        const { rows } = await pool.query(sql, [username]);
        return rows[0] || null;
    }
};