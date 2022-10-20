import { useState } from "react";
import { FindKandy } from "./findKandy";
import { FoundProducts } from "./foundProducts";
import { ProductsList } from "./products";

export const KandyContainer = () => {
  const [searchTerms, setSearchTerms] = useState("");

  return (
    <>
      <FindKandy setterFunction={setSearchTerms} />
      <FoundProducts searchTerms={searchTerms} />
    </>
  );
};
