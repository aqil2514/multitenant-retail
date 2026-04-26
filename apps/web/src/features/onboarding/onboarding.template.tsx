"use client";
import MainContainer from "@/_shared/containers/main-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OnboardingFormField } from "./components/form";

export function OnBoardingTemplate() {
  return (
    <MainContainer className="min-h-screen flex justify-center items-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Persiapan Warung</CardTitle>
          <CardDescription>
            Isi identitas yang diperlukan untuk warung Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingFormField />
        </CardContent>
      </Card>
    </MainContainer>
  );
}
