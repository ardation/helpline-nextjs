/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrganizationReviewCreate
// ====================================================

export interface OrganizationReviewCreate_organizationReviewCreate {
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
}

export interface OrganizationReviewCreate {
  organizationReviewCreate: OrganizationReviewCreate_organizationReviewCreate | null;
}

export interface OrganizationReviewCreateVariables {
  organizationId: string;
  rating: number;
  responseTime: number;
  content?: string | null;
  recaptchaToken: string;
}
