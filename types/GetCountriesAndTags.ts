/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountriesAndTags
// ====================================================

export interface GetCountriesAndTags_countries_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetCountriesAndTags_countries {
  __typename: "Country";
  code: string;
  name: string;
  subdivisions: GetCountriesAndTags_countries_subdivisions[];
}

export interface GetCountriesAndTags_tags {
  __typename: "Tag";
  name: string;
}

export interface GetCountriesAndTags {
  /**
   * Find all countries
   */
  countries: GetCountriesAndTags_countries[];
  /**
   * Find all topics
   */
  topics: GetCountriesAndTags_tags[];
  /**
   * Find all categories
   */
  categories: GetCountriesAndTags_tags[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetCountriesAndTags_tags[];
}
