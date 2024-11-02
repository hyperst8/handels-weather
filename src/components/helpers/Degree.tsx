import { useEffect, useState } from "react";

const Degree = ({ unit }: { unit: string }): JSX.Element => {
  const [symbol, setSymbol] = useState<string>("");

  useEffect(() => {
    if (unit === "metric") {
      setSymbol("C");
    } else if (unit === "imperial") {
      setSymbol("F");
    }
  }, [unit]);

  return <span>°{symbol}</span>;
};

export default Degree;
