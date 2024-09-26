import { JsonLd } from "react-schemaorg"

import ethernaLogo from "@/assets/logo-etherna.png"

import { dayjs } from "@/lib/dayjs"

import type { Organization } from "schema-dts"

export interface OrganizationSchemaProps {
  companyName: string
  companyAddressLocality: string
  companyPostalCode: string
  companyStreetAddress: string
  companyCountry: string
  companyEmail: string
  companyFoundingDate: Date
  companyKeywords: string
}

export function OrganizationSchema({
  companyName,
  companyAddressLocality,
  companyPostalCode,
  companyStreetAddress,
  companyCountry,
  companyEmail,
  companyFoundingDate,
  companyKeywords,
}: OrganizationSchemaProps) {
  return (
    <JsonLd<Organization>
      item={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: companyName,
        address: {
          "@type": "PostalAddress",
          addressLocality: companyAddressLocality,
          postalCode: companyPostalCode,
          streetAddress: companyStreetAddress,
          addressCountry: companyCountry,
        },
        email: companyEmail.replace("@", "(at)"),
        foundingDate: dayjs(companyFoundingDate).format("YYY-MM-DD"),
        keywords: companyKeywords,
        logo: {
          "@type": "ImageObject",
          url: import.meta.env.PUBLIC_SITE_URL + ethernaLogo.src,
        },
      }}
    />
  )
}
