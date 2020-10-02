/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTheWidgetProps
// ====================================================

export interface GetTheWidgetProps_country_subdivisions {
  code: string;
  name: string;
}

export interface GetTheWidgetProps_country {
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetTheWidgetProps_country_subdivisions[];
}

export interface GetTheWidgetProps_organizations_nodes_humanSupportTypes {
  name: string;
}

export interface GetTheWidgetProps_organizations_nodes_categories {
  name: string;
}

export interface GetTheWidgetProps_organizations_nodes_topics {
  name: string;
}

export interface GetTheWidgetProps_organizations_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetTheWidgetProps_organizations_nodes {
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
  humanSupportTypes: GetTheWidgetProps_organizations_nodes_humanSupportTypes[];
  categories: GetTheWidgetProps_organizations_nodes_categories[];
  topics: GetTheWidgetProps_organizations_nodes_topics[];
  openingHours: GetTheWidgetProps_organizations_nodes_openingHours[];
}

export interface GetTheWidgetProps_organizations {
  /**
   * A list of nodes.
   */
  nodes: (GetTheWidgetProps_organizations_nodes | null)[] | null;
}

export interface GetTheWidgetProps_categories {
  name: string;
}

export interface GetTheWidgetProps_humanSupportTypes {
  name: string;
}

export interface GetTheWidgetProps_topics {
  name: string;
}

export interface GetTheWidgetProps_countries_subdivisions {
  code: string;
  name: string;
}

export interface GetTheWidgetProps_countries {
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetTheWidgetProps_countries_subdivisions[];
}

export interface GetTheWidgetProps {
  /**
   * Find a country by code
   */
  country: GetTheWidgetProps_country;
  /**
   * Find all organizations
   */
  organizations: GetTheWidgetProps_organizations;
  /**
   * Find all categories
   */
  categories: GetTheWidgetProps_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetTheWidgetProps_humanSupportTypes[];
  /**
   * Find all topics
   */
  topics: GetTheWidgetProps_topics[];
  /**
   * Find all countries
   */
  countries: GetTheWidgetProps_countries[];
}

export interface GetTheWidgetPropsVariables {
  countryCode: string;
}
