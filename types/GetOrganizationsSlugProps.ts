/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganizationsSlugProps
// ====================================================

export interface GetOrganizationsSlugProps_organization_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetOrganizationsSlugProps_organization_categories {
  __typename: "Tag";
  name: string;
}

export interface GetOrganizationsSlugProps_organization_topics {
  __typename: "Tag";
  name: string;
}

export interface GetOrganizationsSlugProps_organization_openingHours {
  __typename: "OpeningHour";
  day: string;
  open: any;
  close: any;
}

export interface GetOrganizationsSlugProps_organization_country {
  __typename: "Country";
  code: string;
  name: string;
  emergencyNumber: string | null;
}

export interface GetOrganizationsSlugProps_organization {
  __typename: "Organization";
  slug: string;
  name: string;
  alwaysOpen: boolean;
  smsNumber: string | null;
  phoneNumber: string | null;
  url: string | null;
  chatUrl: string | null;
  timezone: string;
  humanSupportTypes: GetOrganizationsSlugProps_organization_humanSupportTypes[];
  categories: GetOrganizationsSlugProps_organization_categories[];
  topics: GetOrganizationsSlugProps_organization_topics[];
  openingHours: GetOrganizationsSlugProps_organization_openingHours[];
  country: GetOrganizationsSlugProps_organization_country;
}

export interface GetOrganizationsSlugProps {
  /**
   * Find an organization by slug
   */
  organization: GetOrganizationsSlugProps_organization;
}

export interface GetOrganizationsSlugPropsVariables {
  slug: string;
}
