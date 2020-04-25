/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetCountryCodeSubdivisionCodePaths
// ====================================================

export interface GetWidgetCountryCodeSubdivisionCodePaths_countries_subdivisions {
  __typename: "Subdivision";
  code: string;
}

export interface GetWidgetCountryCodeSubdivisionCodePaths_countries {
  __typename: "Country";
  code: string;
  subdivisions: GetWidgetCountryCodeSubdivisionCodePaths_countries_subdivisions[];
}

export interface GetWidgetCountryCodeSubdivisionCodePaths {
  /**
   * Find all countries
   */
  countries: GetWidgetCountryCodeSubdivisionCodePaths_countries[];
}
