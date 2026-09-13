import SectionHeader from "@/components/marketing/SectionHeader";
import SectionFooter from "@/components/marketing/SectionFooter";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SectionHeader/>
      <main className="flex ">{children}</main>
      <SectionFooter />
    </>
  );
}
