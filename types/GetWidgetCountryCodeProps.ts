/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetCountryCodeProps
// ====================================================

export interface GetWidgetCountryCodeProps_country {
  __typename: "Country";
  code: string;
  name: string;
  emergencyNumber: string | null;
}

export interface GetWidgetCountryCodeProps_organizations_nodes_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetCountryCodeProps_organizations_nodes_categories {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetCountryCodeProps_organizations_nodes_topics {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetCountryCodeProps_countries_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetWidgetCountryCodeProps_countries {
  __typename: "Country";
  code: string;
  name: string;
  subdivisions: GetWidgetCountryCodeProps_countries_subdivisions[];
}

export interface GetWidgetCountryCodeProps_organizations_nodes_openingHours {
  __typename: "OpeningHour";
  day: string;
  open: any;
  close: any;
}

export interface GetWidgetCountryCodeProps_organizations_nodes {
  __typename: "Organization";
  slug: string;
  name: string;
  alwaysOpen: boolean;
  smsNumber: string | null;
  phoneNumber: string | null;
  url: string | null;
  chatUrl: string | null;
  timezone: string;
  humanSupportTypes: GetWidgetCountryCodeProps_organizations_nodes_humanSupportTypes[];
  categories: GetWidgetCountryCodeProps_organizations_nodes_categories[];
  topics: GetWidgetCountryCodeProps_organizations_nodes_topics[];
  openingHours: GetWidgetCountryCodeProps_organizations_nodes_openingHours[];
}

export interface GetWidgetCountryCodeProps_organizations {
  __typename: "OrganizationConnection";
  /**
   * A list of nodes.
   */
  nodes: (GetWidgetCountryCodeProps_organizations_nodes | null)[] | null;
}

export interface GetWidgetCountryCodeProps_categories {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetCountryCodeProps_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetCountryCodeProps_topics {
  __typename: "Tag";
  name: string;
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
