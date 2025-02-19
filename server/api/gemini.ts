import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerateContentRequest, Part } from "@google/generative-ai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const { data: prompt } = query;
  const genAI = new GoogleGenerativeAI(config.public.gemini_api);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite-preview-02-05",
  });
  const promptString: string | GenerateContentRequest | (string | Part)[] =
    prompt!.toString();

  try {
    const result = await model.generateContent(promptString);
    return result.response;
  } catch (error) {
    return error;
  }
});
