/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocalityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetTopicSlugProps
// ====================================================

export interface GetTopicSlugProps_countries_subdivisions {
  code: string;
  name: string;
}

export interface GetTopicSlugProps_countries {
  code: string;
  name: string;
  locality: LocalityEnum;
  region: string;
  subdivisions: GetTopicSlugProps_countries_subdivisions[];
}

export interface GetTopicSlugProps_topics {
  name: string;
  slug: string;
}

export interface GetTopicSlugProps_topic {
  name: string;
  slug: string;
  markdown: string | null;
}

export interface GetTopicSlugProps {
  /**
   * Find all countries
   */
  countries: GetTopicSlugProps_countries[];
  /**
   * Find all topics
   */
  topics: GetTopicSlugProps_topics[];
  /**
   * Find a topic by slug
   */
  topic: GetTopicSlugProps_topic;
}

export interface GetTopicSlugPropsVariables {
  topicSlug: string;
}
