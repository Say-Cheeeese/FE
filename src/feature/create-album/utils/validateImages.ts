// 이미지 검증 (6MB 이하 체크)
export function validateImages(files: File[]): {
  valid: boolean;
  oversizedFiles: string[];
} {
  const MAX_SIZE = 6 * 1024 * 1024; // 6MB in bytes
  const oversizedFiles: string[] = [];

  files.forEach((file) => {
    if (file.size > MAX_SIZE) {
      oversizedFiles.push(file.name);
    }
  });

  return {
    valid: oversizedFiles.length === 0,
    oversizedFiles,
  };
}
