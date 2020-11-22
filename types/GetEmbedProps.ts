/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocalityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetEmbedProps
// ====================================================

export interface GetEmbedProps_countries_subdivisions {
  code: string;
  name: string;
}

export interface GetEmbedProps_countries {
  code: string;
  name: string;
  locality: LocalityEnum;
  subdivisions: GetEmbedProps_countries_subdivisions[];
}

export interface GetEmbedProps_topics {
  name: string;
}

export interface GetEmbedProps {
  /**
   * Find all countries
   */
  countries: GetEmbedProps_countries[];
  /**
   * Find all topics
   */
  topics: GetEmbedProps_topics[];
}
