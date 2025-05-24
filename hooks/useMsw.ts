"use client";

import { useEffect, useState } from "react";

const useMsw = () => {
  const [mswReady, setMSWReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        if (typeof window !== "undefined") {
          const { worker } = await import("../mocks/browser");
          await worker.start({
            onUnhandledRequest: "bypass",
          });
          setMSWReady(true);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    init();
  }, []);

  return { mswReady };
};

export default useMsw;
