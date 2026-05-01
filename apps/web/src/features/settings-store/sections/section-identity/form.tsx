import { BaseForm, FormFieldPhone, FormFieldTextarea } from "@/_shared/forms";
import {
  identitySchema,
  IdentitySchemaInput,
  IdentitySchemaOutput,
} from "../../schemas/identity.schema";
import { useFormEditSubmit } from "@/_shared/hooks/use-form-edit-submit";
import { webUrl } from "@/constants/urls";
import { StoreNameField } from "./store-name-field";
import { useRouter } from "next/navigation";
import React from "react";

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

  return (
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
  );
}
