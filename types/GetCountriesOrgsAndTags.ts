/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountriesOrgsAndTags
// ====================================================

export interface GetCountriesOrgsAndTags_countries_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetCountriesOrgsAndTags_countries {
  __typename: "Country";
  code: string;
  name: string;
  subdivisions: GetCountriesOrgsAndTags_countries_subdivisions[];
}

export interface GetCountriesOrgsAndTags_tags {
  __typename: "Tag";
  name: string;
}

export interface GetCountriesOrgsAndTags_organizations_nodes_openingHours {
    __typename: 'OpeningHour';
    day: string;
    open: any;
    close: any;
}

export interface GetCountriesOrgsAndTags_organizations_nodes {
    __typename: 'Organization';
    slug: string;
    name: string;
    alwaysOpen: boolean;
    smsNumber: string | null;
    phoneNumber: string | null;
    url: string | null;
    chatUrl: string | null;
    timezone: string;
    humanSupportTypes: GetCountriesOrgsAndTags_tags[];
    categories: GetCountriesOrgsAndTags_tags[];
    topics: GetCountriesOrgsAndTags_tags[];
    openingHours: GetCountriesOrgsAndTags_organizations_nodes_openingHours[];
    country: GetCountriesOrgsAndTags_countries;
}

export interface GetCountriesOrgsAndTags_organizations {
    __typename: 'OrganizationConnection';
    /**
     * A list of nodes.
     */
    nodes: (GetCountriesOrgsAndTags_organizations_nodes | null)[] | null;
}

export interface GetCountriesOrgsAndTags {
    /**
     * Find all countries
     */
    countries: GetCountriesOrgsAndTags_countries[];
    /**
     * Find all orgs
     */
    organizations: GetCountriesOrgsAndTags_organizations;
    /**
     * Find all topics
     */
    topics: GetCountriesOrgsAndTags_tags[];
    /**
     * Find all categories
     */
    categories: GetCountriesOrgsAndTags_tags[];
    /**
     * Find all humanSupportTypes
     */
    humanSupportTypes: GetCountriesOrgsAndTags_tags[];
}
