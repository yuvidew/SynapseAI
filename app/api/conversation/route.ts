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
        prompt: `Based on the following conversation, please provide a ${message.type || "summary"} of the key points discussed, including any important details, conclusions reached, and programming code steps if applicable to the user's query. The conversation is as follows: this query ${message.query} about the ${message.context} topic. Please ensure that the ${message.type || "summary"} is clear, concise, and captures the essence of the discussion, including relevant code snippets and steps if applicable.  

        **Output Format:** ${message.format || "summary"}
        `
    });

    if (!response.text) {
        return NextResponse.json({ result: "No response generated", status: 400 });
    }

    return NextResponse.json({ result: response.text  , status: 200 });
}