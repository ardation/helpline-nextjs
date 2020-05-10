/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetSubdivisionCodeProps
// ====================================================

export interface GetWidgetSubdivisionCodeProps_country_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_country {
  __typename: "Country";
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetWidgetSubdivisionCodeProps_country_subdivisions[];
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes_categories {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes_topics {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes_openingHours {
  __typename: "OpeningHour";
  day: string;
  open: any;
  close: any;
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes {
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
  rating: number;
  reviewCount: number;
  humanSupportTypes: GetWidgetSubdivisionCodeProps_organizations_nodes_humanSupportTypes[];
  categories: GetWidgetSubdivisionCodeProps_organizations_nodes_categories[];
  topics: GetWidgetSubdivisionCodeProps_organizations_nodes_topics[];
  openingHours: GetWidgetSubdivisionCodeProps_organizations_nodes_openingHours[];
}

export interface GetWidgetSubdivisionCodeProps_organizations {
  __typename: "OrganizationConnection";
  /**
   * A list of nodes.
   */
  nodes: (GetWidgetSubdivisionCodeProps_organizations_nodes | null)[] | null;
}

export interface GetWidgetSubdivisionCodeProps_categories {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_topics {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_countries_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_countries {
  __typename: "Country";
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetWidgetSubdivisionCodeProps_countries_subdivisions[];
}

export interface GetWidgetSubdivisionCodeProps {
  /**
   * Find a country by code
   */
  country: GetWidgetSubdivisionCodeProps_country;
  /**
   * Find all organizations
   */
  organizations: GetWidgetSubdivisionCodeProps_organizations;
  /**
   * Find all categories
   */
  categories: GetWidgetSubdivisionCodeProps_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetWidgetSubdivisionCodeProps_humanSupportTypes[];
  /**
   * Find all topics
   */
  topics: GetWidgetSubdivisionCodeProps_topics[];
  /**
   * Find all countries
   */
  countries: GetWidgetSubdivisionCodeProps_countries[];
}

export interface GetWidgetSubdivisionCodePropsVariables {
  countryCode: string;
  subdivisionCode: string;
}
