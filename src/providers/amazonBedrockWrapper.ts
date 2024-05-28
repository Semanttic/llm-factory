import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

import BaseLLM from "../baseLLM";
import { PromptData } from "../types";
import { concatenateMessagesByRole } from "../utils";

class AmazonBedrockWrapper extends BaseLLM {
  private api: BedrockRuntimeClient;

  constructor(apiKey: string, base: string) {
    super(apiKey, base);
    const client = new BedrockRuntimeClient({ region: base });
    this.api = client;
  }

  async createChatCompletion(promptData: PromptData, options = {}) {
    const messages = promptData.messages;

    const systemMessages = concatenateMessagesByRole(messages, "system");
    const userMessages = concatenateMessagesByRole(messages, "user");

    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      messages: userMessages,
      max_tokens: 4000,
      system: systemMessages[0].content,
      // max_tokens: 100,
      // temperature: 0.5,
      // top_p: 1.0,
      // frequency_penalty: 0.0,
      // presence_penalty: 0.0,
      // stop: ["\n"],
      // ...options,
    };

    try {
      const apiResponse = await this.api.send(
        new InvokeModelCommand({
          contentType: "application/json",
          body: JSON.stringify(payload),
          modelId: promptData.model,
        }),
      );

      // Decode and return the response(s)
      const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
      /** @type {ResponseBody} */
      const responseBody = JSON.parse(decodedResponseBody);
      const responses = responseBody.content;
      return responses[0].text ?? "";
    } catch (error) {
      console.error("Error creating chat completion:", error);
      throw error;
    }
  }
}

export default AmazonBedrockWrapper;
