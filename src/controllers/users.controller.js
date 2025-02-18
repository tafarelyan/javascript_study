const bcrypt = require('bcrypt'); // Importe o bcrypt
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'db',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});

const index = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, nome, email FROM users');
    client.release();
    return res.json(result.rows);
  } catch (err) {
    console.log('Erro ao buscar usuários:', err);
    return res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

const create = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Por favor, forneça nome, email e senha' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(senha, saltRounds);

    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, passwordHash]
    );
    client.release();

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log('Erro ao criar usuário:', err);
    if (err.code === '23505') {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }
    return res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};

const show = async (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, nome, email FROM users WHERE id = $1', [userId]);
    client.release();

    if (result.rows.length > 0) {
      return res.json(result.rows[0]);
    } else {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (err) {
    console.log('Erro ao buscar usuário:', err);
    return res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

const update = async (req, res) => {
  const userId = req.params.id;
  const { nome, email, senha } = req.body;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  if (!nome && !email && !senha) {
    return res.status(400).json({ error: 'Por favor, forneça nome, email ou senha para atualizar.' });
  }

  try {
    let passwordHash = null;
    if (senha) {
      const saltRounds = 10;
      passwordHash = await bcrypt.hash(senha, saltRounds);
    }

    const client = await pool.connect();
    let queryText = 'UPDATE users SET ';
    const queryValues = [];
    let updateFields = [];

    if (nome) {
      updateFields.push('nome = $' + (queryValues.length + 1));
      queryValues.push(nome);
    }

    if (email) {
      updateFields.push('email = $' + (queryValues.length + 1));
      queryValues.push(email);
    }

    if (passwordHash) {
      updateFields.push('senha = $' + (queryValues.length + 1));
      queryValues.push(passwordHash);
    }

    queryText += updateFields.join(', ') + ' WHERE id = $' + (queryValues.length + 1) + ' RETURNING *';
    queryValues.push(userId);

    const result = await client.query(queryText, queryValues);
    client.release();

    if (result.rows.length > 0) {
      return res.json(result.rows[0]);
    } else {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (err) {
    console.log('Erro ao atualizar usuário:', err);
    return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

const destroy = async (req, res) => {
  const userId = req.params.id;
  
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    client.release();

    if (result.rows.length > 0) {
      return res.json({ message: 'Usuário excluído com sucesso.', user: result.rows[0] });
    } else {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  } catch (err) {
    console.log('Erro ao excluir usuário:', err);
    return res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};

module.exports = {
    index,
    create,
    show,
    update,
    destroy
};