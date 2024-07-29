import OpenAI from "openai";

export class DocumentParseService {
  openAI: OpenAI = null!;

  constructor() {
    if (!process.env.OPENAI_API_KEY) return;

    this.openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  public async createChatCompletion({
    messages,
    tools = [],
    model = "gpt-4-1106-preview",
  }: {
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
    tools?: OpenAI.Chat.Completions.ChatCompletionTool[];
    model?: string;
  }) {
    const response = await this.openAI.chat.completions.create({
      model,
      messages,
      tools,
    });

    return response;
  }

  public async generateDocumentOutput({
    documentContent,
  }: {
    documentContent: string;
  }) {
    const prompt = `
      ${documentContent}

      Analyze the above document and return the title, a brief summary, a array of all the key document entities and an array of sections that make up the document.
    `;

    const result = await this.createChatCompletion({
      messages: [
        {
          role: "system",
          content: "You are a helpful document analysis tool.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "extract_document_info",
            parameters: {
              type: "object",
              properties: {
                document_details: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      description:
                        "Title of document if given, or the first line of the document",
                    },
                    summary: {
                      type: "string",
                      description: "Brief summary of document",
                    },
                    entities: {
                      type: "array",
                      description:
                        "Array of key entities like names, dates and locations found in the document",
                      items: {
                        type: "string",
                        description:
                          "Entity name and description or context of the entity",
                      },
                    },
                    outline: {
                      type: "array",
                      description:
                        "Array of sections found in the document that help describe the context of the content like section headings and bullet points",
                      items: {
                        type: "string",
                        description: "Section name and description",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    });

    if (result.choices[0].message.tool_calls) {
      return JSON.parse(
        result.choices[0].message.tool_calls[0].function.arguments
      );
    } else {
      throw { status: 400, message: "Failed to parse document." };
    }
  }
}
