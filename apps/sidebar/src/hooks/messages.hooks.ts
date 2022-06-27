// Messages react hooks
import { Messages } from "@architect/types";
import { useEffect, useState } from "react";

export const useListenMessages = () => {
  const [message, setMessage] = useState<Messages>();

  useEffect(() => {
    if (!window.isVsCode) return;

    const subscriber = (event: MessageEvent) => {
      setMessage(event.data);
    };

    window.addEventListener("message", subscriber);
    return () => {
      window.removeEventListener("message", subscriber);
    };
  }, []);

  return message;
};
