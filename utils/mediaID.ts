function parseMediaId(id?: string): number {
  if (!id) return 0;

  return Number(id.split('-')[0]);
}

function createMediaUrl(id: number | undefined, title: string | undefined): string {
  if (!id || !title) return '';

  const titleFormat = title.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, '-').toLowerCase();

  return `${id}-${titleFormat}`;
}

export { createMediaUrl, parseMediaId };
