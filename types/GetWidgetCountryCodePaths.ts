/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetCountryCodePaths
// ====================================================

export interface GetWidgetCountryCodePaths_countries {
  __typename: "Country";
  code: string;
}

export interface GetWidgetCountryCodePaths {
  /**
   * Find all countries
   */
  countries: GetWidgetCountryCodePaths_countries[];
}
