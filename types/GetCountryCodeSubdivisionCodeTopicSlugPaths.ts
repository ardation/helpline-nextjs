/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocalityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCountryCodeSubdivisionCodeTopicSlugPaths
// ====================================================

export interface GetCountryCodeSubdivisionCodeTopicSlugPaths_countries_subdivisions {
  code: string;
}

export interface GetCountryCodeSubdivisionCodeTopicSlugPaths_countries {
  code: string;
  locality: LocalityEnum;
  subdivisions: GetCountryCodeSubdivisionCodeTopicSlugPaths_countries_subdivisions[];
}

export interface GetCountryCodeSubdivisionCodeTopicSlugPaths_topics {
  slug: string;
}

export interface GetCountryCodeSubdivisionCodeTopicSlugPaths {
  /**
   * Find all countries
   */
  countries: GetCountryCodeSubdivisionCodeTopicSlugPaths_countries[];
  /**
   * Find all topics
   */
  topics: GetCountryCodeSubdivisionCodeTopicSlugPaths_topics[];
}
