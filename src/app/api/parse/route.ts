export const dynamic = "force-dynamic";
import { DocumentParseService } from "./parse.service";
import { zfd } from "zod-form-data";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_FILE_TYPES = ["text/plain"];

const postSchema = zfd.formData({
  file: zfd
    .file()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .txt formats are supported."
    ),
});

// Todo: Add some middleware for schema validation and generic error handling so adding controllers/endpoints is not a pain
export async function POST(request: Request) {
  const { success, error, data } = postSchema.safeParse(
    await request.formData()
  );

  if (!success) {
    return Response.json(error.issues, {
      status: 400,
    });
  }

  try {
    const parseService = new DocumentParseService();
    const documentContent = await data.file.text();
    const response = await parseService.generateDocumentOutput({
      documentContent,
    });

    return Response.json(response);
  } catch (err) {
    return Response.json((err as ApiError).message, {
      status: 400,
    });
  }
}
