/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountryCodesAndNames
// ====================================================

export interface GetCountries_countries {
    __typename: "Country";
    code: string;
    name: string;
  }

  export interface GetCountryCodesAndNames {
    /**
     * Find all countries
     */
    countries: GetCountries_countries[];
  }
