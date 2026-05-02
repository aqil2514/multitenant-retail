import React, { createContext, useContext, useState } from "react";
import { ProductUnitsConflictData } from "../../interface/ss-product-units";

interface SectionProductUnitContextType {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;

  conflictData: ProductUnitsConflictData | null;
  setConflictData: React.Dispatch<
    React.SetStateAction<ProductUnitsConflictData | null>
  >;
}

const SectionProductUnitContext = createContext<SectionProductUnitContextType>(
  {} as SectionProductUnitContextType,
);

export function SectionProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [conflictData, setConflictData] =
    useState<ProductUnitsConflictData | null>(null);

  const values: SectionProductUnitContextType = {
    conflictData,
    isEditing,
    setConflictData,
    setIsEditing,
  };

  return (
    <SectionProductUnitContext.Provider value={values}>
      {children}
    </SectionProductUnitContext.Provider>
  );
}

export const useSectionProduct = () => useContext(SectionProductUnitContext)