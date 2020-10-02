/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganizationsSlugPaths
// ====================================================

export interface GetOrganizationsSlugPaths_organizations_nodes {
  slug: string;
}

export interface GetOrganizationsSlugPaths_organizations {
  /**
   * A list of nodes.
   */
  nodes: (GetOrganizationsSlugPaths_organizations_nodes | null)[] | null;
}

export interface GetOrganizationsSlugPaths {
  /**
   * Find all organizations
   */
  organizations: GetOrganizationsSlugPaths_organizations;
}
