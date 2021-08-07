/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountryCodeSubdivisonCodeTopicSlugProps
// ====================================================

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_country_subdivisions {
  code: string;
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_country {
  code: string;
  name: string;
  emergencyNumber: string | null;
  subdivisions: GetCountryCodeSubdivisonCodeTopicSlugProps_country_subdivisions[];
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_topic {
  name: string;
  slug: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes_categories {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes_topics {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes {
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
  humanSupportTypes: GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes_humanSupportTypes[];
  categories: GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes_categories[];
  topics: GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes_topics[];
  openingHours: GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes_openingHours[];
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizations {
  /**
   * A list of nodes.
   */
  nodes: (GetCountryCodeSubdivisonCodeTopicSlugProps_organizations_nodes | null)[] | null;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes_categories {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes_topics {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes {
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
  humanSupportTypes: GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes_humanSupportTypes[];
  categories: GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes_categories[];
  topics: GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes_topics[];
  openingHours: GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes_openingHours[];
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty {
  /**
   * A list of nodes.
   */
  nodes: (GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty_nodes | null)[] | null;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_categories {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps_topics {
  name: string;
}

export interface GetCountryCodeSubdivisonCodeTopicSlugProps {
  /**
   * Find a country by code
   */
  country: GetCountryCodeSubdivisonCodeTopicSlugProps_country;
  /**
   * Find a topic by slug
   */
  topic: GetCountryCodeSubdivisonCodeTopicSlugProps_topic;
  /**
   * Find all organizations
   */
  organizations: GetCountryCodeSubdivisonCodeTopicSlugProps_organizations;
  /**
   * Find all organizations
   */
  organizationsWhenEmpty: GetCountryCodeSubdivisonCodeTopicSlugProps_organizationsWhenEmpty;
  /**
   * Find all categories
   */
  categories: GetCountryCodeSubdivisonCodeTopicSlugProps_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetCountryCodeSubdivisonCodeTopicSlugProps_humanSupportTypes[];
  /**
   * Find all topics
   */
  topics: GetCountryCodeSubdivisonCodeTopicSlugProps_topics[];
}

export interface GetCountryCodeSubdivisonCodeTopicSlugPropsVariables {
  countryCode: string;
  subdivisionCode: string;
  topicSlug: string;
}
