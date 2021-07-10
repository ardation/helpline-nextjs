/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetServerSitemap
// ====================================================

export interface GetServerSitemap_countries_subdivisions {
  code: string;
}

export interface GetServerSitemap_countries {
  code: string;
  subdivisions: GetServerSitemap_countries_subdivisions[];
}

export interface GetServerSitemap_topics {
  name: string;
}

export interface GetServerSitemap {
  /**
   * Find all countries
   */
  countries: GetServerSitemap_countries[];
  /**
   * Find all topics
   */
  topics: GetServerSitemap_topics[];
}
