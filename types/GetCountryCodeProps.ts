/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountryCodeProps
// ====================================================

export interface GetCountryCodeProps_country {
  code: string;
  name: string;
  emergencyNumber: string | null;
}

export interface GetCountryCodeProps_organizations_nodes_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeProps_organizations_nodes_categories {
  name: string;
}

export interface GetCountryCodeProps_organizations_nodes_topics {
  name: string;
}

export interface GetCountryCodeProps_organizations_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetCountryCodeProps_organizations_nodes {
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
  humanSupportTypes: GetCountryCodeProps_organizations_nodes_humanSupportTypes[];
  categories: GetCountryCodeProps_organizations_nodes_categories[];
  topics: GetCountryCodeProps_organizations_nodes_topics[];
  openingHours: GetCountryCodeProps_organizations_nodes_openingHours[];
}

export interface GetCountryCodeProps_organizations {
  /**
   * A list of nodes.
   */
  nodes: (GetCountryCodeProps_organizations_nodes | null)[] | null;
}

export interface GetCountryCodeProps_categories {
  name: string;
}

export interface GetCountryCodeProps_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeProps_topics {
  name: string;
}

export interface GetCountryCodeProps {
  /**
   * Find a country by code
   */
  country: GetCountryCodeProps_country;
  /**
   * Find all organizations
   */
  organizations: GetCountryCodeProps_organizations;
  /**
   * Find all categories
   */
  categories: GetCountryCodeProps_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetCountryCodeProps_humanSupportTypes[];
  /**
   * Find all topics
   */
  topics: GetCountryCodeProps_topics[];
}

export interface GetCountryCodePropsVariables {
  countryCode: string;
}
