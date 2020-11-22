/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocalityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetWidgetSubdivisionCodeProps
// ====================================================

export interface GetWidgetSubdivisionCodeProps_country_subdivisions {
  code: string;
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_country {
  code: string;
  name: string;
  emergencyNumber: string | null;
  locality: LocalityEnum;
  subdivisions: GetWidgetSubdivisionCodeProps_country_subdivisions[];
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes_humanSupportTypes {
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes_categories {
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes_topics {
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetWidgetSubdivisionCodeProps_organizations_nodes {
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
  humanSupportTypes: GetWidgetSubdivisionCodeProps_organizations_nodes_humanSupportTypes[];
  categories: GetWidgetSubdivisionCodeProps_organizations_nodes_categories[];
  topics: GetWidgetSubdivisionCodeProps_organizations_nodes_topics[];
  openingHours: GetWidgetSubdivisionCodeProps_organizations_nodes_openingHours[];
}

export interface GetWidgetSubdivisionCodeProps_organizations {
  /**
   * A list of nodes.
   */
  nodes: (GetWidgetSubdivisionCodeProps_organizations_nodes | null)[] | null;
}

export interface GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes_humanSupportTypes {
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes_categories {
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes_topics {
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes {
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
  humanSupportTypes: GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes_humanSupportTypes[];
  categories: GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes_categories[];
  topics: GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes_topics[];
  openingHours: GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes_openingHours[];
}

export interface GetWidgetSubdivisionCodeProps_organizationsWhenEmpty {
  /**
   * A list of nodes.
   */
  nodes: (GetWidgetSubdivisionCodeProps_organizationsWhenEmpty_nodes | null)[] | null;
}

export interface GetWidgetSubdivisionCodeProps_categories {
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_humanSupportTypes {
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_topics {
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_countries_subdivisions {
  code: string;
  name: string;
}

export interface GetWidgetSubdivisionCodeProps_countries {
  code: string;
  name: string;
  emergencyNumber: string | null;
  locality: LocalityEnum;
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
   * Find all organizations
   */
  organizationsWhenEmpty: GetWidgetSubdivisionCodeProps_organizationsWhenEmpty;
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
