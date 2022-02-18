import { useState, useCallback } from 'react';
import { db, dbArr } from 'types/db';

const useSetMatch = (data: dbArr, input?: string) => {
  const [match, setMatches] = useState<dbArr>([]);

  const handler = useCallback(() => {
    if (!input) {
      setMatches(
        [
          ...data.sort((a: db, b: db) => {
            return b.repurchase_rate - a.repurchase_rate;
          }),
        ].slice(0, 5)
      );
      // else{
      //     setMatches()
      // }
    }
  }, [match]);

  return [match, handler];
};
