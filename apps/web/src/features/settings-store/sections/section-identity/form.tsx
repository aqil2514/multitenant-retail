import { BaseForm, FormFieldPhone, FormFieldTextarea } from "@/_shared/forms";
import {
  identitySchema,
  IdentitySchemaInput,
} from "../../schemas/identity.schema";
import { useFormEditSubmit } from "@/_shared/hooks/use-form-edit-submit";
import { webUrl } from "@/constants/urls";
import { StoreNameField } from "./store-name-field";
import { useRouter } from "next/navigation";
import React from "react";
import { useStoreSettings } from "../../ss.context";

interface Props {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: IdentitySchemaInput;
}

export function StoreSettingForm({
  isEditing,
  setIsEditing,
  defaultValues,
}: Props) {
  const { refetch } = useStoreSettings();
  const router = useRouter();

  const { submit } = useFormEditSubmit<{
    success: boolean;
    newSlugUrl: string | null;
  }>({
    endpoint: "settings/store/identity",
    onSuccess(data) {
      if (data.newSlugUrl) {
        router.replace(`${webUrl}/${data.newSlugUrl}/settings/store`);
      }
      refetch();
      setIsEditing(false);
    },
  });

  return (
    <BaseForm
      defaultValues={defaultValues}
      schema={identitySchema}
      onSubmit={submit}
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
  );
}
