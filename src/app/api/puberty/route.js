// src/app/api/puberty/route.js

import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('mmaphokengsenne');
    const collection = database.collection('data');
    const data = await collection.findOne({ title: 'Puberty' });

    if (!data) {
      throw new Error('Data not found');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
