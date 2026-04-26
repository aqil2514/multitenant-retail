import { OnBoardingTemplate } from "@/features/onboarding/onboarding.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Persiapan",
};

export default function OnboardingPage(){
    return <OnBoardingTemplate />
}