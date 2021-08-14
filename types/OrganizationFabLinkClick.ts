/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationIncrementCountMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: OrganizationFabLinkClick
// ====================================================

export interface OrganizationFabLinkClick_organizationIncrementCount_organization {
  id: string;
}

export interface OrganizationFabLinkClick_organizationIncrementCount {
  organization: OrganizationFabLinkClick_organizationIncrementCount_organization;
}

export interface OrganizationFabLinkClick {
  organizationIncrementCount: OrganizationFabLinkClick_organizationIncrementCount | null;
}

export interface OrganizationFabLinkClickVariables {
  input: OrganizationIncrementCountMutationInput;
}
