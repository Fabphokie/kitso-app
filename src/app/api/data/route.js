import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Make sure this environment variable is correctly set
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('mmaphokengsenne'); // Your database name
    const collection = database.collection('data'); // Your collection name

    const document = await collection.findOne(); // Fetch one document

    if (document) {
      return new Response(JSON.stringify(document), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'No data found' }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
  } finally {
    await client.close();
  }
}
