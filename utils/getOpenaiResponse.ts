import { Preference } from "@/context/PreferenceContext";
import { Configuration, OpenAIApi } from "openai";

type Arguments = {
  preferences: Preference[];
  prompt: string;
  location: string;
};
export type AI_RESPONSE = {
  response: {
    question: string;
    preferences: Preference[];
    answer: Array<Hotel>;
    location: string;
  };
};
export type Hotel = {
  hotel_name: string;
  brief_description: string;
  blubs: string[];
};
export async function getOpenAIResponse({
  preferences,
  prompt,
  location,
}: Arguments): Promise<AI_RESPONSE> {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  let processedPreference: string = "";
  preferences.map((preference) => {
    processedPreference = processedPreference + preference.type + ",";
  });

  const actualPrompt = `Array of 10, ${processedPreference} hotels in ${location} with a 3 sentence description and 3 short blubs that guests have said or wrote in reviews of each in the format of a JSON array below [{"hotel_name":"","brief_description":"","blubs":[]}]`;

  let answer;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a hotel expert who gives correct and genuine answer about hotels `,
        },
        {
          role: "user",
          content: actualPrompt,
        },
      ],
    });
    answer =
      response.data.choices[0].message?.content ||
      "Sorry I cannot help you with that";

    if (
      response.data.choices[0].finish_reason === "length" &&
      response.data.choices[0].message?.content
    ) {
      const newResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "assistant",
            content: response.data.choices[0].message.content,
          },
          {
            role: "user",
            content: actualPrompt,
          },
        ],
      });

      answer = answer + newResponse.data.choices[0].message?.content;
    }
    // Return a response indicating success
    return {
      response: {
        preferences: preferences,
        question: `10 best hotels in ${location}`,
        answer: answerInTheFormOfObject(answer),
        location,
      },
    };
  } catch (error) {
    throw error;
  }
}
function answerInTheFormOfObject(text: string) {
  const startIndex = text.indexOf("["); // Find the index of the first square bracket
  const endIndex = text.lastIndexOf("]"); // Find the index of the last square bracket
  const jsonArrayText = text.substring(startIndex, endIndex + 1); // Extract the JSON array text
  const jsonArray = JSON.parse(jsonArrayText); // Parse the JSON array text into a JavaScript object
  return jsonArray;
}
