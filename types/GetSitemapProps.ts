/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSitemapProps
// ====================================================

export interface GetSitemapProps_countries_subdivisions {
  code: string;
  name: string;
}

export interface GetSitemapProps_countries {
  code: string;
  name: string;
  subdivisions: GetSitemapProps_countries_subdivisions[];
}

export interface GetSitemapProps_topics {
  name: string;
  slug: string;
}

export interface GetSitemapProps_organizations_nodes {
  name: string;
  slug: string;
}

export interface GetSitemapProps_organizations {
  /**
   * A list of nodes.
   */
  nodes: (GetSitemapProps_organizations_nodes | null)[] | null;
}

export interface GetSitemapProps {
  /**
   * Find all countries
   */
  countries: GetSitemapProps_countries[];
  /**
   * Find all topics
   */
  topics: GetSitemapProps_topics[];
  /**
   * Find all organizations
   */
  organizations: GetSitemapProps_organizations;
}
