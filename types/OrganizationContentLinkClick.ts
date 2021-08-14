/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrganizationIncrementCountMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: OrganizationContentLinkClick
// ====================================================

export interface OrganizationContentLinkClick_organizationIncrementCount_organization {
  id: string;
}

export interface OrganizationContentLinkClick_organizationIncrementCount {
  organization: OrganizationContentLinkClick_organizationIncrementCount_organization;
}

export interface OrganizationContentLinkClick {
  organizationIncrementCount: OrganizationContentLinkClick_organizationIncrementCount | null;
}

export interface OrganizationContentLinkClickVariables {
  input: OrganizationIncrementCountMutationInput;
}
