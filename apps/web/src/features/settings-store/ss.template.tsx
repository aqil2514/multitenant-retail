"use client";

import MainContainer from "@/_shared/containers/main-container";
import { StoreSettingsProvider } from "./ss.context";
import { PageHeader } from "@/_shared/molecules/page-header";
import { SectionIdentity } from "./sections/section-identity";
import { SectionProductUnit } from "./sections/section-product-unit";

interface Props {
  storeSlug: string;
}

export function StoreSettingsTemplate({ storeSlug }: Props) {
  return (
    <StoreSettingsProvider storeSlug={storeSlug}>
      <InnerTemplate />
    </StoreSettingsProvider>
  );
}

const InnerTemplate = () => {
  return (
    <MainContainer>
      <PageHeader title="Pengaturan Toko" />
      <SectionIdentity />
      <SectionProductUnit />
    </MainContainer>
  );
};
