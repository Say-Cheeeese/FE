const MAX_SIZE = 13 * 1024 * 1024; // 13MB in bytes

export function validateImage(file: File): boolean {
  return file.size <= MAX_SIZE;
}

export function validateImageCount(files: File[]): number {
  return files.filter((file) => !validateImage(file)).length;
}

export function validateImages(files: File[]): {
  valid: boolean;
  oversizedFiles: string[];
} {
  const oversizedFiles: string[] = [];

  files.forEach((file) => {
    if (!validateImage(file)) {
      oversizedFiles.push(file.name);
    }
  });

  return {
    valid: oversizedFiles.length === 0,
    oversizedFiles,
  };
}
