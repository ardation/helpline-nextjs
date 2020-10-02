/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInfluencerSlugProps
// ====================================================

export interface GetInfluencerSlugProps_influencer {
  slug: string;
  name: string;
  message: string;
}

export interface GetInfluencerSlugProps_countries_subdivisions {
  code: string;
  name: string;
}

export interface GetInfluencerSlugProps_countries {
  code: string;
  name: string;
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
