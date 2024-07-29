export const downloadData = ({ fileName, data }: { fileName: string, data: unknown }) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;

  if (!document) return;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `${fileName}.json`;

  link.click();
};

