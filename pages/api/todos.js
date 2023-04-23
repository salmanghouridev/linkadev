import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  const db = await connectToDatabase();
  const todosCollection = db.collection('todos');

  if (req.method === 'POST') {
    const todo = req.body;

    try {
      await todosCollection.insertOne(todo);
      res.status(201).json({ message: 'ToDo added!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add ToDo.' });
    }
  }

  if (req.method === 'GET') {
    try {
      const todos = await todosCollection.find().toArray();
      res.status(200).json({ todos });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch ToDos.' });
    }
  }
}
