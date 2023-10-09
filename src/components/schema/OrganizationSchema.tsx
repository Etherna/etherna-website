import { JsonLd } from "react-schemaorg"

import ethernaLogo from "@/assets/logo-etherna.png"

import type { Organization } from "schema-dts"

export type OrganizationSchemaProps = {}

const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({}) => {
  return (
    <JsonLd<Organization>
      item={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Etherna SA",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lugano",
          postalCode: "6974",
          streetAddress: "Via Rava 13",
          addressCountry: "CH",
        },
        email: "info(at)etherna.io",
        foundingDate: "2018-05-28",
        keywords: "decentralized transparent video platform",
        logo: {
          "@type": "ImageObject",
          url: import.meta.env.SITE_URL + ethernaLogo.src,
        },
      }}
    />
  )
}

export default OrganizationSchema
