import { useState } from "react";

//Хук для фетчинга отдельных элементов, также подразумевались демонстрация загрузки и
//проверка но ошибки, но не были реализованы

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
