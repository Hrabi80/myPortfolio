import { JsonLd } from "@/components/seo/JsonLd";
import { getConsultingService } from "@/data/services";
import { ConsultingServicePage } from "@/features/services/components/ConsultingServicePage";
import {
  buildConsultingServiceJsonLd,
  buildConsultingServiceMetadata,
} from "@/features/services/services-seo";

const service = getConsultingService("full-stack-javascript-consultant")!;

export const metadata = buildConsultingServiceMetadata(service);

export default function FullStackJavascriptConsultantPage() {
  return (
    <>
      <JsonLd data={buildConsultingServiceJsonLd(service)} />
      <ConsultingServicePage service={service} />
    </>
  );
}
