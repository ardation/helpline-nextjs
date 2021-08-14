/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CountrySubdivisionIncrementCountMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SubdivisionCodePageView
// ====================================================

export interface SubdivisionCodePageView_countrySubdivisionIncrementCount_subdivision {
  id: string;
}

export interface SubdivisionCodePageView_countrySubdivisionIncrementCount {
  subdivision: SubdivisionCodePageView_countrySubdivisionIncrementCount_subdivision;
}

export interface SubdivisionCodePageView {
  countrySubdivisionIncrementCount: SubdivisionCodePageView_countrySubdivisionIncrementCount | null;
}

export interface SubdivisionCodePageViewVariables {
  input: CountrySubdivisionIncrementCountMutationInput;
}
