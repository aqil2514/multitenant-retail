import { FormFieldText } from "@/_shared/forms";
import { UseFormReturn, useWatch } from "react-hook-form";
import {
  IdentitySchemaInput,
  IdentitySchemaOutput,
} from "../../schemas/identity.schema";
import { useEffect, useMemo } from "react";
import { webUrl } from "@/constants/urls";
import slugify from "slugify";

interface Props {
  form: UseFormReturn<IdentitySchemaInput, unknown, IdentitySchemaOutput>;
  isEditing: boolean;
}

export function StoreNameField({ form, isEditing }: Props) {
  const storeName = useWatch({
    control: form.control,
    name: "name",
    defaultValue:""
  });

  const slug = useWatch({
    control: form.control,
    name: "slug",
    defaultValue:""
  });

  const fullSlugUrl = useMemo(() => `${webUrl}/${slug}`, [slug]);

  useEffect(() => {
    if(!storeName) return;
    
    const slug = slugify(storeName, {
      locale: "id",
      lower: true,
      strict: true,
    });
    form.setValue("slug", slug);
  }, [form, storeName]);
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormFieldText
        form={form}
        label="Nama Toko"
        name="name"
        disabled={!isEditing}
      />
      <FormFieldText
        form={form}
        label="Slug"
        name="slug"
        disabled={!isEditing}
      />
      <p className="font-semibold text-xs text-muted-foreground">
        URL Toko Anda : {fullSlugUrl}
      </p>
    </div>
  );
}
