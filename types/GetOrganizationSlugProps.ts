/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganizationSlugProps
// ====================================================

export interface GetOrganizationSlugProps_organization_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetOrganizationSlugProps_organization_categories {
  __typename: "Tag";
  name: string;
}

export interface GetOrganizationSlugProps_organization_topics {
  __typename: "Tag";
  name: string;
}

export interface GetOrganizationSlugProps_organization_openingHours {
  __typename: "OpeningHour";
  day: string;
  open: any;
  close: any;
}

export interface GetOrganizationSlugProps_organization_country {
  __typename: "Country";
  code: string;
  name: string;
  emergencyNumber: string | null;
}

export interface GetOrganizationSlugProps_organization {
  __typename: "Organization";
  slug: string;
  name: string;
  alwaysOpen: boolean;
  smsNumber: string | null;
  phoneNumber: string | null;
  url: string | null;
  chatUrl: string | null;
  timezone: string;
  humanSupportTypes: GetOrganizationSlugProps_organization_humanSupportTypes[];
  categories: GetOrganizationSlugProps_organization_categories[];
  topics: GetOrganizationSlugProps_organization_topics[];
  openingHours: GetOrganizationSlugProps_organization_openingHours[];
  country: GetOrganizationSlugProps_organization_country;
}

export interface GetOrganizationSlugProps {
  /**
   * Find an organization by slug
   */
  organization: GetOrganizationSlugProps_organization;
}

export interface GetOrganizationSlugPropsVariables {
  slug: string;
}
