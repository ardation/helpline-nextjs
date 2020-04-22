/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetCountriesAndSubdivisions
// ====================================================

export interface GetWidgetCountriesAndSubdivisions_countries_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetWidgetCountriesAndSubdivisions_countries {
  __typename: "Country";
  code: string;
  name: string;
  subdivisions: GetWidgetCountriesAndSubdivisions_countries_subdivisions[];
}

export interface GetWidgetCountriesAndSubdivisions_categories {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetCountriesAndSubdivisions_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetCountriesAndSubdivisions_topics {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetCountriesAndSubdivisions {
  /**
   * Find all countries
   */
  countries: GetWidgetCountriesAndSubdivisions_countries[];
  /**
   * Find all categories
   */
  categories: GetWidgetCountriesAndSubdivisions_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetWidgetCountriesAndSubdivisions_humanSupportTypes[];
  /**
   * Find all topics
   */
  topics: GetWidgetCountriesAndSubdivisions_topics[]; 
}
