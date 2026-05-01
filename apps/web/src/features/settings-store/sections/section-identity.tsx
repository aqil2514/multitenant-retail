import {
  BaseForm,
  FormFieldPhone,
  FormFieldText,
  FormFieldTextarea,
} from "@/_shared/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  identitySchema,
  IdentitySchemaInput,
  IdentitySchemaOutput,
} from "../schemas/identity.schema";
import React, { useEffect, useMemo, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import slugify from "slugify";
import { webUrl } from "@/constants/urls";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import { useStoreSettings } from "../ss.context";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormEditSubmit } from "@/_shared/hooks/use-form-edit-submit";
import { useRouter } from "next/navigation";

export function SectionIdentity() {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading } = useStoreSettings();
  const router = useRouter();

  const { submit } = useFormEditSubmit<{
    success: boolean;
    newSlugUrl: string | null;
  }>({
    endpoint: "settings/store",
    onSuccess(data) {
      if (data.newSlugUrl) {
        router.replace(`${webUrl}/${data.newSlugUrl}/settings/store`);
      }
      setIsEditing(false);
    },
  });

  const submitHandler = (values: IdentitySchemaOutput) => {
    const newValues = {
      ...values,
      section: "identity",
    };
    submit(newValues);
  };

  const defaultValues = useMemo<IdentitySchemaInput | undefined>(() => {
    if (!data) return undefined;

    return {
      name: data.storeIdentity.name,
      phone: data.storeIdentity.phone,
      address: data.storeIdentity.address,
    };
  }, [data]);

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Identitas Toko</CardTitle>
        <CardDescription>
          Informasi dasar mengenai toko Anda yang akan muncul di profil dan
          struk belanja.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          variant={"outline"}
          size={"icon"}
          disabled={isLoading}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <X /> : <Edit />}
        </Button>
        {isLoading || !defaultValues ? (
          <SectionIdentitySkeleton />
        ) : (
          <BaseForm
            defaultValues={defaultValues}
            schema={identitySchema}
            onSubmit={submitHandler}
            disabled={!isEditing}
          >
            {(form) => (
              <div className="space-y-4">
                <StoreNameField form={form} isEditing={isEditing} />
                <FormFieldPhone
                  form={form}
                  label="Nomor Telepon"
                  name="phone"
                  disabled={!isEditing}
                />
                <FormFieldTextarea
                  form={form}
                  label="Alamat Warung"
                  name="address"
                  disabled={!isEditing}
                />
              </div>
            )}
          </BaseForm>
        )}
      </CardContent>
    </Card>
  );
}

const StoreNameField: React.FC<{
  form: UseFormReturn<IdentitySchemaInput, unknown, IdentitySchemaOutput>;
  isEditing: boolean;
}> = ({ form, isEditing }) => {
  const storeName = useWatch({
    control: form.control,
    name: "name",
  });

  const slug = useWatch({
    control: form.control,
    name: "slug",
  });

  const fullSlugUrl = useMemo(() => `${webUrl}/${slug}`, [slug]);

  useEffect(() => {
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
};

const SectionIdentitySkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Skeleton Nama Toko */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-3 w-48" />
      </div>

      {/* Skeleton Nomor Telepon */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Skeleton Alamat */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
};
