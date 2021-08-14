/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CountrySubdivisionIncrementCountMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: WidgetSubdivisionCodePageView
// ====================================================

export interface WidgetSubdivisionCodePageView_countrySubdivisionIncrementCount_subdivision {
  id: string;
}

export interface WidgetSubdivisionCodePageView_countrySubdivisionIncrementCount {
  subdivision: WidgetSubdivisionCodePageView_countrySubdivisionIncrementCount_subdivision;
}

export interface WidgetSubdivisionCodePageView {
  countrySubdivisionIncrementCount: WidgetSubdivisionCodePageView_countrySubdivisionIncrementCount | null;
}

export interface WidgetSubdivisionCodePageViewVariables {
  input: CountrySubdivisionIncrementCountMutationInput;
}
