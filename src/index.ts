// import OpenAIWrapper from './OpenAIWrapper';
import env from "@semanttic/env";

import AmazonBedrockWrapper from "./providers/amazonBedrockWrapper";
import AzureMistralWrapper from "./providers/azureMistralWrapper";
import AzureOpenAIWrapper from "./providers/azureOpenAIWrapper";
import BaseLLM from "./baseLLM";
import OpenAIWrapper from "./providers/openAIWrapper";
import { PromptData } from "./types";

class LLMFactory {
  static createLLM(provider: string) {
    switch (provider) {
      case "openai":
        return new OpenAIWrapper(env.OPENAI_API_KEY, "");
      case "azure":
        return new AzureOpenAIWrapper(
          env.OPENAI_AZURE_API_KEY,
          env.OPENAI_AZURE_API_BASE,
        );
      case "mistral":
        return new AzureMistralWrapper(
          env.MISTRAL_AZURE_API_KEY,
          env.MISTRAL_AZURE_API_BASE,
        );
      case "amazon":
        return new AmazonBedrockWrapper("", env.AWS_REGION);
      default:
        throw new Error("Unsupported LLM provider");
    }
  }

  private static providers: { [key: string]: BaseLLM } = {};

  static createLLMs() {
    // Initialize language model providers
    LLMFactory.providers["openai"] = new OpenAIWrapper(env.OPENAI_API_KEY, "");
    LLMFactory.providers["azure"] = new AzureOpenAIWrapper(
      env.OPENAI_AZURE_API_KEY,
      env.OPENAI_AZURE_API_BASE,
    );
    LLMFactory.providers["mistral"] = new AzureMistralWrapper(
      env.MISTRAL_AZURE_API_KEY,
      env.MISTRAL_AZURE_API_BASE,
    );
    LLMFactory.providers["amazon"] = new AmazonBedrockWrapper("", env.AWS_REGION);

    return new LLMFactory();
  }

  createChatCompletion(providerKey: string, promptData: PromptData) {
    const llm = LLMFactory.providers[providerKey];
    if (!llm) {
      throw new Error(
        `Unsupported LLM provider or provider not initialized: ${providerKey}`,
      );
    }
    return llm.createChatCompletion(promptData);
  }
}

export default LLMFactory;

export * from "./types";
