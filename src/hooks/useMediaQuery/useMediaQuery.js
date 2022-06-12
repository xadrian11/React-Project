import { useState, useMemo, useEffect } from 'react';

const useMediaQuery = (query) => {
  const media = useMemo(() => window.matchMedia(query), [query]);
  const [matches, setMatches] = useState(media.matches);

  useEffect(() => {
    setMatches(media.matches);
    const listener = (event) => setMatches(event.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [media]);

  return matches;
};

export default useMediaQuery;
