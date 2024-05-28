import { PromptMessage } from "./types";

export const concatenateMessagesByRole = (
  messages: PromptMessage[],
  role: string,
) => {
  // Filter messages by role
  const filteredMessages = messages.filter((message) => message.role === role);

  // Concatenate the content of filtered messages
  const concatenatedContent = filteredMessages
    .map((message) => message.content)
    .join(" ");

  // Return the result as an object
  return [{ role: role, content: concatenatedContent }];
};
