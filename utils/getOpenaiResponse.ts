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
    answer: {
      hotel_name: string;
      brief_description: string;
    }[];
  };
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
    processedPreference = processedPreference
      ? processedPreference + `${preference.category} : ${preference.type} \n`
      : `\n${preference.category} : ${preference.type} \n`;
  });

  const actualPrompt = `${
    prompt || "10 hotels"
  } in ${location} with the following attributes ${processedPreference}
  With a two line description of each.
  `;
  let answer;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You give answer about hotels in the form of JSON object below: [{"hotel_name":"","brief_description":""}] Note:String must be valid from JSON.parse() in JavaScript and data doesn't need to be realtime`,
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
        question: `${prompt || "10 hotels"} in ${location}`,
        answer: answerInTheFormOfObject(answer),
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
