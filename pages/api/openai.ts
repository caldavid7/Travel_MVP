import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  organization: "org-7Gd4Qa9tLzqLrAZ7AVZvhy2H",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Preferences = {
  category: string;
  type: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // Return a response indicating that only POST requests are allowed
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const {
    preferences,
    location,
  }: { location: string; prompt: string; preferences: Preferences[] } =
    req.body;

  let processedPreference: string = "";
  preferences.map((preference) => {
    processedPreference = processedPreference
      ? processedPreference + `${preference.category} : ${preference.type} \n`
      : `\n${preference.category} : ${preference.type} \n`;
  });

  const actualPrompt = `What the best hotels in ${location} with the following feature ${processedPreference} With a little description of each one.`;

  // Log the output to the console
  console.log(actualPrompt);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a expert about hotels in the world who only gives correct and genuine answer in a human like tone",
        },
        {
          role: "user",
          content: actualPrompt,
        },
      ],
    });
    console.log(response.data.choices[0]);
    // Return a response indicating success
    res.status(200).json({
      success: true,
      response: {
        question: "What are the best hotels" + " in " + location,
        answer:
          response.data.choices[0].message?.content ||
          "There was an error please try again",
      },
    });
  } catch (error) {
    // Send an error response to the user
    res.status(500).json({
      success: false,
      error:
        "There was an error processing your request. Please try again later.",
    });
  }
}
