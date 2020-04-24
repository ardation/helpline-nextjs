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
}

export interface GetWidgetCountriesAndSubdivisions_countries {
  __typename: "Country";
  code: string;
  subdivisions: GetWidgetCountriesAndSubdivisions_countries_subdivisions[];
}

export interface GetWidgetCountriesAndSubdivisions {
  /**
   * Find all countries
   */
  countries: GetWidgetCountriesAndSubdivisions_countries[];
}
