/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CountryIncrementCountMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CountryCodePageView
// ====================================================

export interface CountryCodePageView_countryIncrementCount_country {
  id: string;
}

export interface CountryCodePageView_countryIncrementCount {
  country: CountryCodePageView_countryIncrementCount_country;
}

export interface CountryCodePageView {
  countryIncrementCount: CountryCodePageView_countryIncrementCount | null;
}

export interface CountryCodePageViewVariables {
  input: CountryIncrementCountMutationInput;
}
