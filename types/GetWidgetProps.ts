/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWidgetProps
// ====================================================

export interface GetWidgetProps_countries_subdivisions {
  __typename: "Subdivision";
  code: string;
  name: string;
}

export interface GetWidgetProps_countries {
  __typename: "Country";
  code: string;
  name: string;
  subdivisions: GetWidgetProps_countries_subdivisions[];
}

export interface GetWidgetProps_topics {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetProps_categories {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetProps_humanSupportTypes {
  __typename: "Tag";
  name: string;
}

export interface GetWidgetProps {
  /**
   * Find all countries
   */
  countries: GetWidgetProps_countries[];
  /**
   * Find all topics
   */
  topics: GetWidgetProps_topics[];
  /**
   * Find all categories
   */
  categories: GetWidgetProps_categories[];
  /**
   * Find all humanSupportTypes
   */
  humanSupportTypes: GetWidgetProps_humanSupportTypes[];
}
