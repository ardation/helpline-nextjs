/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountryCodePaths
// ====================================================

export interface GetCountryCodePaths_countries {
  __typename: "Country";
  code: string;
}

export interface GetCountryCodePaths {
  /**
   * Find all countries
   */
  countries: GetCountryCodePaths_countries[];
}
