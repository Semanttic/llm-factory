import OpenAI from "openai";

import BaseLLM from "../baseLLM";
import { PromptData } from "../types";

class openAIWrapper extends BaseLLM {
  private api: OpenAI;

  constructor(apiKey: string, base: string) {
    super(apiKey, base);
    const client = new OpenAI({
      apiKey,
    });
    this.api = client;
  }

  async createChatCompletion(promptData: PromptData, options = {}) {
    try {
      const { id, created, choices, usage } =
        await await this.api.chat.completions.create({
          model: promptData.model,
          messages: promptData.messages,
        });

      return choices[0].message?.content ?? "";
    } catch (error) {
      console.error("Error creating chat completion:", error);
      throw error;
    }
  }
}

export default openAIWrapper;
