/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetCountryCodeProps
// ====================================================

export interface GetWidgetCountryCodeProps_country_subdivisions {
  code: string;
  name: string;
}

export interface GetWidgetCountryCodeProps_country {
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetWidgetCountryCodeProps_country_subdivisions[];
}

export interface GetWidgetCountryCodeProps_organizations_nodes_humanSupportTypes {
  name: string;
}

export interface GetWidgetCountryCodeProps_organizations_nodes_categories {
  name: string;
}

export interface GetWidgetCountryCodeProps_organizations_nodes_topics {
  name: string;
}

export interface GetWidgetCountryCodeProps_organizations_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetWidgetCountryCodeProps_organizations_nodes {
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
  humanSupportTypes: GetWidgetCountryCodeProps_organizations_nodes_humanSupportTypes[];
  categories: GetWidgetCountryCodeProps_organizations_nodes_categories[];
  topics: GetWidgetCountryCodeProps_organizations_nodes_topics[];
  openingHours: GetWidgetCountryCodeProps_organizations_nodes_openingHours[];
}

export interface GetWidgetCountryCodeProps_organizations {
  /**
   * A list of nodes.
   */
  nodes: (GetWidgetCountryCodeProps_organizations_nodes | null)[] | null;
}

export interface GetWidgetCountryCodeProps_categories {
  name: string;
}

export interface GetWidgetCountryCodeProps_humanSupportTypes {
  name: string;
}

export interface GetWidgetCountryCodeProps_topics {
  name: string;
}

export interface GetWidgetCountryCodeProps_countries_subdivisions {
  code: string;
  name: string;
}

export interface GetWidgetCountryCodeProps_countries {
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetWidgetCountryCodeProps_countries_subdivisions[];
}

export interface GetWidgetCountryCodeProps {
  /**
   * Find a country by code
   */
  country: GetWidgetCountryCodeProps_country;
  /**
   * Find all organizations
   */
  organizations: GetWidgetCountryCodeProps_organizations;
  /**
   * Find all categories
   */
  categories: GetWidgetCountryCodeProps_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetWidgetCountryCodeProps_humanSupportTypes[];
  /**
   * Find all topics
   */
  topics: GetWidgetCountryCodeProps_topics[];
  /**
   * Find all countries
   */
  countries: GetWidgetCountryCodeProps_countries[];
}

export interface GetWidgetCountryCodePropsVariables {
  countryCode: string;
}
