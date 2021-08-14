/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationIncrementCountMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: OrganizationPageView
// ====================================================

export interface OrganizationPageView_organizationIncrementCount_organization {
  id: string;
}

export interface OrganizationPageView_organizationIncrementCount {
  organization: OrganizationPageView_organizationIncrementCount_organization;
}

export interface OrganizationPageView {
  organizationIncrementCount: OrganizationPageView_organizationIncrementCount | null;
}

export interface OrganizationPageViewVariables {
  input: OrganizationIncrementCountMutationInput;
}
