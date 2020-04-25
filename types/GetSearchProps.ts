/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSearchProps
// ====================================================

export interface GetSearchProps_countries_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetSearchProps_countries {
  __typename: "Country";
  code: string;
  name: string;
  subdivisions: GetSearchProps_countries_subdivisions[];
}

export interface GetSearchProps_topics {
  __typename: "Tag";
  name: string;
}

export interface GetSearchProps {
  /**
   * Find all countries
   */
  countries: GetSearchProps_countries[];
  /**
   * Find all topics
   */
  topics: GetSearchProps_topics[];
}
