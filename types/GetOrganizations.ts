/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganizations
// ====================================================

export interface GetOrganizations_organizations_nodes {
  __typename: "Organization";
  slug: string;
}

export interface GetOrganizations_organizations {
  __typename: "OrganizationConnection";
  /**
   * A list of nodes.
   */
  nodes: (GetOrganizations_organizations_nodes | null)[] | null;
}

export interface GetOrganizations {
  /**
   * Find all organizations
   */
  organizations: GetOrganizations_organizations;
}
