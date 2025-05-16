import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {  NextResponse } from "next/server";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || ""
});

export async function POST(request:Request) {
    const {message} = await request.json();

    const response = await generateText({
        model : google("gemini-1.5-flash" ),
        prompt: `Rewrite the following query title into a brief and clear context statement: ${message.title}`,
    });

    if (!response.text) {
        return NextResponse.json({ result: "No response generated", status: 400 });
    }

    return NextResponse.json({ context: response.text  , status: 200 });
}