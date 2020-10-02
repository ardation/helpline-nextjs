/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ContactCreate
// ====================================================

export interface ContactCreate_contactCreate {
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
}

export interface ContactCreate {
  contactCreate: ContactCreate_contactCreate | null;
}

export interface ContactCreateVariables {
  subject: string;
  email: string;
  message: string;
  recaptchaToken: string;
}
