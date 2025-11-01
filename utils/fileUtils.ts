
/**
 * Converts a File object to a base64 encoded string, including the data URL prefix.
 * @param file The File object to convert.
 * @returns A promise that resolves with an object containing the full base64 data URL and the extracted base64 data and mime type.
 */
export const fileToBase64 = (file: File): Promise<{ fullDataUrl: string; base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // The result is in the format "data:image/jpeg;base64,LzlqLzRB..."
      const [header, data] = result.split(',');
      if (!header || !data) {
        return reject(new Error('Invalid file format'));
      }
      const mimeType = header.split(':')[1].split(';')[0];
      resolve({ fullDataUrl: result, base64: data, mimeType });
    };
    reader.onerror = (error) => reject(error);
  });
};
