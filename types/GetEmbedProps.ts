/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEmbedProps
// ====================================================

export interface GetEmbedProps_countries {
  __typename: "Country";
  code: string;
  name: string;
}

export interface GetEmbedProps {
  /**
   * Find all countries
   */
  countries: GetEmbedProps_countries[];
}
