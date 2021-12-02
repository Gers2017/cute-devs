import React from "react";
import { useIsLoggedQuery } from "@generated";

function Urql() {
  const [result, reexecute] = useIsLoggedQuery();
  const { data, error, fetching } = result;
  if (fetching) return <p>Fetching... ;)</p>;
  if (error) return <pre>{error}</pre>;

  data && console.log(data.me);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Urql;
