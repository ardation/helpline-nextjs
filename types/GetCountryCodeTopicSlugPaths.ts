/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountryCodeTopicSlugPaths
// ====================================================

export interface GetCountryCodeTopicSlugPaths_countries {
  code: string;
}

export interface GetCountryCodeTopicSlugPaths_topics {
  slug: string;
}

export interface GetCountryCodeTopicSlugPaths {
  /**
   * Find all countries
   */
  countries: GetCountryCodeTopicSlugPaths_countries[];
  /**
   * Find all topics
   */
  topics: GetCountryCodeTopicSlugPaths_topics[];
}
