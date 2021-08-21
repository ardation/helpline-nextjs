/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InfluencerIncrementCountMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: InfluencerPageView
// ====================================================

export interface InfluencerPageView_influencerIncrementCount_influencer {
  id: string;
}

export interface InfluencerPageView_influencerIncrementCount {
  influencer: InfluencerPageView_influencerIncrementCount_influencer;
}

export interface InfluencerPageView {
  influencerIncrementCount: InfluencerPageView_influencerIncrementCount | null;
}

export interface InfluencerPageViewVariables {
  input: InfluencerIncrementCountMutationInput;
}
