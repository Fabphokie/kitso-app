// src/app/api/query/route.js

import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    await client.connect();
    const database = client.db('mmaphokengsenne');
    const collection = database.collection('data');

    const { question } = await request.json();

    // Example query: Find documents where the title or content matches the question
    const query = {
      $or: [
        { title: { $regex: question, $options: 'i' } },
        { content: { $regex: question, $options: 'i' } }
      ]
    };

    const data = await collection.findOne(query);

    if (!data) {
      return NextResponse.json({ message: 'No relevant data found' }, { status: 404 });
    }

    // Assuming 'data' has a 'page' or 'url' field that contains the link to the page
    const response = {
      content: data.content,  // The relevant content from the database
      pageUrl: `/${data.title.toLowerCase().replace(/ /g, '-')}`,  // The URL of the page
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
