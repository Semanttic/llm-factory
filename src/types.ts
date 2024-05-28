export type PromptMessage = UserMessage | SystemMessage | AssistantMessage;

export type Content =
  | string
  | (
      | { type: "text"; text: string }
      | {
          type: "image_url";
          image_url: {
            url: string;
          };
        }
    )[];

export interface UserMessage {
  content: Content;
  role: "user";
  name?: string;
}

export interface SystemMessage {
  content: string;
  role: "system";
  name?: string;
}

export interface AssistantMessage {
  content: string;
  role: "assistant";
  name?: string;
}

export interface PromptData {
  messages: PromptMessage[];
  provider: string;
  model: string;
  format?: "json_object" | "text";
  temperature?: number;
}
