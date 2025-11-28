interface GetOpenAlbumGridConfig {
  columns: string;
  rows: string;
  areas: string;
  side1Row?: string;
}

export function getOpenAlbumGridConfig(count: number): GetOpenAlbumGridConfig {
  if (count <= 1) {
    return {
      columns: '1fr',
      rows: '1fr',
      areas: '"main"',
    };
  }

  if (count === 2) {
    return {
      columns: '2fr 1fr',
      rows: '1fr',
      areas: '"main side1"',
      side1Row: '1 / span 2',
    };
  }

  return {
    columns: '2fr 1fr',
    rows: '1fr 1fr',
    areas: '"main side1"\n    "main side2"',
  };
}
