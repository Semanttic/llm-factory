import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

import BaseLLM from "../baseLLM";
import { PromptData } from "../types";

class AzureOpenAIWrapper extends BaseLLM {
  private api: OpenAIClient;

  constructor(apiKey: string, base: string) {
    super(apiKey, base);
    const client = new OpenAIClient(base, new AzureKeyCredential(apiKey));
    this.api = client;
  }

  async createChatCompletion(promptData: PromptData, options = {}) {
    // Replace image_url with imageUrl, because azure for some reason doesn't have the same types as openai...
    const messages = promptData.messages.map((message) => {
      if (message.content instanceof Array) {
        return {
          ...message,
          content: message.content.map((content) => {
            if (content.type === "image_url") {
              const message = {
                type: "image_url",
                imageUrl: content.image_url,
              } as const;
              return message;
            }
            return content;
          }),
        };
      }
      return {
        ...message,
        content: message.content as string,
      };
    });

    try {
      const { id, created, choices, usage } = await this.api.getChatCompletions(
        promptData.model,
        messages,
        {
          responseFormat: promptData.format
            ? {
              type: promptData.format,
            }
            : undefined,
          maxTokens: 4096,
        },
      );

      return choices[0].message?.content ?? "";
    } catch (error) {
      console.error("Error creating chat completion:", error);
      throw error;
    }
  }
}

export default AzureOpenAIWrapper;
