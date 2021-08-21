/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocalityEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetInfluencerSlugProps
// ====================================================

export interface GetInfluencerSlugProps_influencer {
  name: string;
  slug: string;
  message: string;
}

export interface GetInfluencerSlugProps_countries_subdivisions {
  code: string;
  name: string;
}

export interface GetInfluencerSlugProps_countries {
  code: string;
  name: string;
  region: string;
  locality: LocalityEnum;
  subdivisions: GetInfluencerSlugProps_countries_subdivisions[];
}

export interface GetInfluencerSlugProps_topics {
  name: string;
}

export interface GetInfluencerSlugProps {
  /**
   * Find a influencer by slug
   */
  influencer: GetInfluencerSlugProps_influencer;
  /**
   * Find all countries
   */
  countries: GetInfluencerSlugProps_countries[];
  /**
   * Find all topics
   */
  topics: GetInfluencerSlugProps_topics[];
}

export interface GetInfluencerSlugPropsVariables {
  influencerSlug: string;
}
