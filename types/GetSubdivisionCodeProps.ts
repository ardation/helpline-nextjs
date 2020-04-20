/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSubdivisionCodeProps
// ====================================================

export interface GetSubdivisionCodeProps_country_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetSubdivisionCodeProps_country {
  __typename: "Country";
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetSubdivisionCodeProps_country_subdivisions[];
}

export interface GetSubdivisionCodeProps_organizations_nodes_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetSubdivisionCodeProps_organizations_nodes_categories {
  __typename: "Tag";
  name: string;
}

export interface GetSubdivisionCodeProps_organizations_nodes_topics {
  __typename: "Tag";
  name: string;
}

export interface GetSubdivisionCodeProps_organizations_nodes_openingHours {
  __typename: "OpeningHour";
  day: string;
  open: any;
  close: any;
}

export interface GetSubdivisionCodeProps_organizations_nodes {
  __typename: "Organization";
  slug: string;
  name: string;
  alwaysOpen: boolean;
  smsNumber: string | null;
  phoneNumber: string | null;
  url: string | null;
  chatUrl: string | null;
  timezone: string;
  humanSupportTypes: GetSubdivisionCodeProps_organizations_nodes_humanSupportTypes[];
  categories: GetSubdivisionCodeProps_organizations_nodes_categories[];
  topics: GetSubdivisionCodeProps_organizations_nodes_topics[];
  openingHours: GetSubdivisionCodeProps_organizations_nodes_openingHours[];
}

export interface GetSubdivisionCodeProps_organizations {
  __typename: "OrganizationConnection";
  /**
   * A list of nodes.
   */
  nodes: (GetSubdivisionCodeProps_organizations_nodes | null)[] | null;
}

export interface GetSubdivisionCodeProps_categories {
  __typename: "Tag";
  name: string;
}

export interface GetSubdivisionCodeProps_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetSubdivisionCodeProps_topics {
  __typename: "Tag";
  name: string;
}

export interface GetSubdivisionCodeProps {
  /**
   * Find a country by code
   */
  country: GetSubdivisionCodeProps_country;
  /**
   * Find all organizations
   */
  organizations: GetSubdivisionCodeProps_organizations;
  /**
   * Find all categories
   */
  categories: GetSubdivisionCodeProps_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetSubdivisionCodeProps_humanSupportTypes[];
  /**
   * Find all topics
   */
  topics: GetSubdivisionCodeProps_topics[];
}

export interface GetSubdivisionCodePropsVariables {
  countryCode: string;
  subdivisionCode: string;
}
