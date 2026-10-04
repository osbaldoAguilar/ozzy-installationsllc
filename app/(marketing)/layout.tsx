import BusinessJsonLd from "@/components/marketing/BusinessJsonLd";
import SeasonBanner from "@/components/marketing/SeasonBanner";
import SectionHeader from "@/components/marketing/SectionHeader";
import SectionFooter from "@/components/marketing/SectionFooter";
import MobileCallBar from "@/components/marketing/MobileCallBar";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <BusinessJsonLd />
      <SeasonBanner />
      <SectionHeader/>
      <main className="flex-1">{children}</main>
      <SectionFooter />
      {/* Spacer so the pinned call bar never covers the footer on phones. */}
      <div aria-hidden="true" className="h-[calc(4.5rem+env(safe-area-inset-bottom))] bg-deep-space-blue-200 md:hidden" />
      <MobileCallBar />
    </>
  );
}
