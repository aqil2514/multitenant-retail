import {
  BaseForm,
  FormFieldPhone,
  FormFieldText,
  FormFieldTextarea,
} from "@/_shared/forms";
import {
  defaultOnBoarding,
  onBoardingSchema,
} from "../schema/onboarding.schema";
import { useResourceMutation } from "@/_shared/hooks/use-resource-mutation";
import { useRouter } from "next/navigation";

export function OnboardingFormField() {
  const router = useRouter();
  const { performAction } = useResourceMutation({
    actionType: "add",
    endpoint: "onboarding",
    translations: {
      pending: "Sedang diproses...",
      success: "Toko berhasil dibuat",
    },
    resourceKey: "onboarding-store",
    onSuccess: (data) => {
      router.replace(`/${data.slug}/dashboard`);
    },
  });
  return (
    <BaseForm
      defaultValues={defaultOnBoarding}
      schema={onBoardingSchema}
      // onSubmit={(values) => {
      //   console.log(values)
      //   // performAction(values);
      // }}
      onSubmit={performAction}
    >
      {(form) => (
        <div className="space-y-4">
          <FormFieldText
            form={form}
            name="name"
            label="Nama Toko"
            placeholder="Misal : Warung Frozen Food, Toko Bangunan"
          />
          <FormFieldPhone
            form={form}
            name="phone"
            label="Nomor Telepon (Opsional)"
            placeholder="812345678"
          />
          <FormFieldTextarea
            form={form}
            name="address"
            label="Alamat Toko (Opsional)"
            placeholder="Jl. Raya 123"
          />
        </div>
      )}
    </BaseForm>
  );
}
