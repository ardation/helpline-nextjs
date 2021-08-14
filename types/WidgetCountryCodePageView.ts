/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CountryIncrementCountMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: WidgetCountryCodePageView
// ====================================================

export interface WidgetCountryCodePageView_countryIncrementCount_country {
  id: string;
}

export interface WidgetCountryCodePageView_countryIncrementCount {
  country: WidgetCountryCodePageView_countryIncrementCount_country;
}

export interface WidgetCountryCodePageView {
  countryIncrementCount: WidgetCountryCodePageView_countryIncrementCount | null;
}

export interface WidgetCountryCodePageViewVariables {
  input: CountryIncrementCountMutationInput;
}
