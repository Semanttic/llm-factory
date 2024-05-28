import axios, { AxiosInstance } from "axios";

import BaseLLM from "../baseLLM";
import { PromptData } from "../types";

class AzureMistralWrapper extends BaseLLM {
  private api: AxiosInstance;

  constructor(apiKey: string, base: string) {
    super(apiKey, base);

    this.api = axios.create({
      baseURL: base,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  async createChatCompletion(promptData: PromptData, options = {}) {
    try {
      const response = await this.api.post("/v1/chat/completions", promptData);

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error creating chat completion:", error);
      throw error;
    }
  }
}

export default AzureMistralWrapper;
