/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountriesForWidget
// ====================================================

export interface GetCountriesForWidget_countries {
  __typename: "Country";
  code: string;
}

export interface GetCountriesForWidget {
  /**
   * Find all countries
   */
  countries: GetCountriesForWidget_countries[];
}
