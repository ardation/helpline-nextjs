/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountryCodeSubdivisonCodeProps
// ====================================================

export interface GetCountryCodeSubdivisonCodeProps_country_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_country {
  __typename: "Country";
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetCountryCodeSubdivisonCodeProps_country_subdivisions[];
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes_categories {
  __typename: "Tag";
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes_topics {
  __typename: "Tag";
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes_openingHours {
  __typename: "OpeningHour";
  day: string;
  open: any;
  close: any;
}

export interface GetCountryCodeSubdivisonCodeProps_organizations_nodes {
  __typename: "Organization";
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
  __typename: "OrganizationConnection";
  /**
   * A list of nodes.
   */
  nodes: (GetCountryCodeSubdivisonCodeProps_organizations_nodes | null)[] | null;
}

export interface GetCountryCodeSubdivisonCodeProps_categories {
  __typename: "Tag";
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetCountryCodeSubdivisonCodeProps_topics {
  __typename: "Tag";
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
