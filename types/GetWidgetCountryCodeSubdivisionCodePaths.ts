/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetCountryCodeSubdivisionCodePaths
// ====================================================

export interface GetWidgetCountryCodeSubdivisionCodePaths_countries_subdivisions {
  code: string;
}

export interface GetWidgetCountryCodeSubdivisionCodePaths_countries {
  code: string;
  subdivisions: GetWidgetCountryCodeSubdivisionCodePaths_countries_subdivisions[];
}

export interface GetWidgetCountryCodeSubdivisionCodePaths {
  /**
   * Find all countries
   */
  countries: GetWidgetCountryCodeSubdivisionCodePaths_countries[];
}
