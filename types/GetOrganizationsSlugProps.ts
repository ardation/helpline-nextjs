/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganizationsSlugProps
// ====================================================

export interface GetOrganizationsSlugProps_organization_reviews {
  rating: number;
  content: string | null;
  createdAt: any;
}

export interface GetOrganizationsSlugProps_organization_humanSupportTypes {
  name: string;
}

export interface GetOrganizationsSlugProps_organization_categories {
  name: string;
}

export interface GetOrganizationsSlugProps_organization_topics {
  name: string;
}

export interface GetOrganizationsSlugProps_organization_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetOrganizationsSlugProps_organization_subdivisions {
  name: string;
}

export interface GetOrganizationsSlugProps_organization_country {
  code: string;
  name: string;
  emergencyNumber: string | null;
}

export interface GetOrganizationsSlugProps_organization {
  id: string;
  slug: string;
  name: string;
  alwaysOpen: boolean;
  smsNumber: string | null;
  phoneNumber: string | null;
  url: string | null;
  chatUrl: string | null;
  timezone: string;
  featured: boolean;
  verified: boolean;
  rating: number;
  reviewCount: number;
  notes: string | null;
  reviews: GetOrganizationsSlugProps_organization_reviews[];
  humanSupportTypes: GetOrganizationsSlugProps_organization_humanSupportTypes[];
  categories: GetOrganizationsSlugProps_organization_categories[];
  topics: GetOrganizationsSlugProps_organization_topics[];
  openingHours: GetOrganizationsSlugProps_organization_openingHours[];
  subdivisions: GetOrganizationsSlugProps_organization_subdivisions[];
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
