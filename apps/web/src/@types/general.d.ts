export interface LabelValue<T extends string = string> {
  label: string;
  value: T;
}

export interface BasePageProps {
  params: Promise<{ storeSlug: string }>;
}
