import { useEffect, useMemo, useState } from 'react';

/** URL → base64(data URL) 변환 */
async function imageUrlToBase64(url: string): Promise<string> {
  const res = await fetch(url, { mode: 'cors' });
  const blob = await res.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

interface UseBase64ImagesOptions {
  imageUrl?: string | null;
  imageUrls?: Array<string | null | undefined>;
}

export function useBase64Images({
  imageUrl,
  imageUrls,
}: UseBase64ImagesOptions) {
  const [base64List, setBase64List] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const urls = useMemo(() => {
    if (imageUrls && imageUrls.length > 0) return imageUrls;
    if (imageUrl) return [imageUrl];
    return [];
  }, [imageUrl, imageUrls]);

  useEffect(() => {
    if (!urls || urls.length === 0) {
      setBase64List([]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const convert = async () => {
      try {
        const converted = await Promise.all(
          urls.map(async (src) => {
            if (!src) return null;
            try {
              return await imageUrlToBase64(src);
            } catch (err) {
              console.error('base64 변환 실패:', src, err);
              return null;
            }
          }),
        );
        if (!cancelled) {
          setBase64List(converted);
        }
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    convert();

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return { base64List, loading, error };
}
