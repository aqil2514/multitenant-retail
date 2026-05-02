import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IdentitySchemaInput } from "../../schemas/identity.schema";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import { useStoreSettings } from "../../ss.context";
import { SectionIdentitySkeleton } from "./skeleton";
import { StoreSettingForm } from "./form";

export function SectionIdentity() {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading } = useStoreSettings();

  const defaultValues = useMemo<IdentitySchemaInput | undefined>(() => {
    if (!data) return undefined;

    return {
      name: data.storeIdentity.name,
      phone: data.storeIdentity.phone,
      address: data.storeIdentity.address,
      slug: data.storeIdentity.slug
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
          <StoreSettingForm
            defaultValues={defaultValues}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )}
      </CardContent>
    </Card>
  );
}
