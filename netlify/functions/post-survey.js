/***************************************************************************
FILE: post-survey.js

This is a RESTful endpoint for logging demographic info of the user.
It supports GET, POST, and DELETE.

The POST should be a JSON object containing fields:
USER_ID: int
engagement_level: int
confidence_level: int

The GET output is an array of JSON objects containing the aforementioned
fields.
***************************************************************************/

const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const db = () => client.db("Rating-Interface-Website").collection("post-survey")

export async function GET() {
    try {
        await client.connect();
        const items = await db().find({}).toArray();
        return Response.json(items)

    }
    catch (error) {
        console.error(error)
        return Response.json({error: "Failed to GET post-survey", status: 500})
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        await client.connect();
        const result = await db().insertOne(body);
        return Response.json(result, {status: 201});
    }
    catch (error) {
        console.error(error);
        return Response.json({error: "Failed to POST post-survey", status: 500})

    }
}

export async function DELETE(_, { params }) {
    try {
        await client.connect()
        await db().deleteOne({ _id: new ObjectId(params.id) })
        return Response.json({success: true})
    }
    catch(error) {
        console.error(error);
        return Response.json({error: "Failed to DELETE post-survey", status: 500})
    }
}