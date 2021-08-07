/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocalityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCountryCodeTopicSlugProps
// ====================================================

export interface GetCountryCodeTopicSlugProps_country {
  code: string;
  name: string;
  emergencyNumber: string | null;
  locality: LocalityEnum;
}

export interface GetCountryCodeTopicSlugProps_topic {
  name: string;
  slug: string;
}

export interface GetCountryCodeTopicSlugProps_organizations_nodes_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeTopicSlugProps_organizations_nodes_categories {
  name: string;
}

export interface GetCountryCodeTopicSlugProps_organizations_nodes_topics {
  name: string;
}

export interface GetCountryCodeTopicSlugProps_organizations_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetCountryCodeTopicSlugProps_organizations_nodes {
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
  humanSupportTypes: GetCountryCodeTopicSlugProps_organizations_nodes_humanSupportTypes[];
  categories: GetCountryCodeTopicSlugProps_organizations_nodes_categories[];
  topics: GetCountryCodeTopicSlugProps_organizations_nodes_topics[];
  openingHours: GetCountryCodeTopicSlugProps_organizations_nodes_openingHours[];
}

export interface GetCountryCodeTopicSlugProps_organizations {
  /**
   * A list of nodes.
   */
  nodes: (GetCountryCodeTopicSlugProps_organizations_nodes | null)[] | null;
}

export interface GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes_categories {
  name: string;
}

export interface GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes_topics {
  name: string;
}

export interface GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes {
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
  humanSupportTypes: GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes_humanSupportTypes[];
  categories: GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes_categories[];
  topics: GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes_topics[];
  openingHours: GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes_openingHours[];
}

export interface GetCountryCodeTopicSlugProps_organizationsWhenEmpty {
  /**
   * A list of nodes.
   */
  nodes: (GetCountryCodeTopicSlugProps_organizationsWhenEmpty_nodes | null)[] | null;
}

export interface GetCountryCodeTopicSlugProps_categories {
  name: string;
}

export interface GetCountryCodeTopicSlugProps_humanSupportTypes {
  name: string;
}

export interface GetCountryCodeTopicSlugProps_topics {
  name: string;
}

export interface GetCountryCodeTopicSlugProps {
  /**
   * Find a country by code
   */
  country: GetCountryCodeTopicSlugProps_country;
  /**
   * Find a topic by slug
   */
  topic: GetCountryCodeTopicSlugProps_topic;
  /**
   * Find all organizations
   */
  organizations: GetCountryCodeTopicSlugProps_organizations;
  /**
   * Find all organizations
   */
  organizationsWhenEmpty: GetCountryCodeTopicSlugProps_organizationsWhenEmpty;
  /**
   * Find all categories
   */
  categories: GetCountryCodeTopicSlugProps_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetCountryCodeTopicSlugProps_humanSupportTypes[];
  /**
   * Find all topics
   */
  topics: GetCountryCodeTopicSlugProps_topics[];
}

export interface GetCountryCodeTopicSlugPropsVariables {
  countryCode: string;
  topicSlug: string;
}
