const MAX_SIZE = 6 * 1024 * 1024; // 6MB in bytes

// 단일 이미지 검증 (6MB 이하 체크)
export function validateImage(file: File): boolean {
  return file.size <= MAX_SIZE;
}

// 6MB 초과 이미지 개수 반환
export function validateImageCount(files: File[]): number {
  return files.filter((file) => !validateImage(file)).length;
}

// 이미지 배열 검증 (6MB 이하 체크)
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
