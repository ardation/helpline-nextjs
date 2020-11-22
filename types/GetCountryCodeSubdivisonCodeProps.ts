/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountryCodeSubdivisonCodeProps
// ====================================================

export interface GetCountryCodeSubdivisonCodeProps_country_subdivisions {
  code: string;
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_country {
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetCountryCodeSubdivisonCodeProps_country_subdivisions[];
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes_categories {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes_topics {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes {
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
  humanSupportTypes: GetCountryCodeSubdivisonCodeProps_organizations_nodes_humanSupportTypes[];
  categories: GetCountryCodeSubdivisonCodeProps_organizations_nodes_categories[];
  topics: GetCountryCodeSubdivisonCodeProps_organizations_nodes_topics[];
  openingHours: GetCountryCodeSubdivisonCodeProps_organizations_nodes_openingHours[];
}

export interface GetCountryCodeSubdivisonCodeProps_organizations {
  /**
   * A list of nodes.
   */
  nodes: (GetCountryCodeSubdivisonCodeProps_organizations_nodes | null)[] | null;
}

export interface GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes_categories {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes_topics {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes {
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
  humanSupportTypes: GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes_humanSupportTypes[];
  categories: GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes_categories[];
  topics: GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes_topics[];
  openingHours: GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes_openingHours[];
}

export interface GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty {
  /**
   * A list of nodes.
   */
  nodes: (GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty_nodes | null)[] | null;
}

export interface GetCountryCodeSubdivisonCodeProps_categories {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_topics {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps {
  /**
   * Find a country by code
   */
  country: GetCountryCodeSubdivisonCodeProps_country;
  /**
   * Find all organizations
   */
  organizations: GetCountryCodeSubdivisonCodeProps_organizations;
  /**
   * Find all organizations
   */
  organizationsWhenEmpty: GetCountryCodeSubdivisonCodeProps_organizationsWhenEmpty;
  /**
   * Find all categories
   */
  categories: GetCountryCodeSubdivisonCodeProps_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetCountryCodeSubdivisonCodeProps_humanSupportTypes[];
  /**
   * Find all topics
   */
  topics: GetCountryCodeSubdivisonCodeProps_topics[];
}

export interface GetCountryCodeSubdivisonCodePropsVariables {
  countryCode: string;
  subdivisionCode: string;
}
