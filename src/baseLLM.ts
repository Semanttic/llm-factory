import { PromptData } from "./types";

abstract class BaseLLM {
  apiKey: any;
  model: any;

  constructor(apiKey: any, model: any) {
    this.apiKey = apiKey;
    this.model = model;
  }

  abstract createChatCompletion(
    prompt: PromptData,
    options?: unknown,
  ): Promise<string>;
}

export default BaseLLM;
