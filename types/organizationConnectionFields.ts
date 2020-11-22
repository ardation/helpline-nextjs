/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: organizationConnectionFields
// ====================================================

export interface organizationConnectionFields_nodes_humanSupportTypes {
  name: string;
}

export interface organizationConnectionFields_nodes_categories {
  name: string;
}

export interface organizationConnectionFields_nodes_topics {
  name: string;
}

export interface organizationConnectionFields_nodes_openingHours {
  day: string;
  open: any;
  close: any;
}

export interface organizationConnectionFields_nodes {
  id: string;
  slug: string;
  name: string;
  alwaysOpen: boolean;
  smsNumber: string | null;
  phoneNumber: string | null;
  url: string | null;
  chatUrl: string | null;
  timezone: string;
  featured: boolean;
  verified: boolean;
  rating: number;
  reviewCount: number;
  humanSupportTypes: organizationConnectionFields_nodes_humanSupportTypes[];
  categories: organizationConnectionFields_nodes_categories[];
  topics: organizationConnectionFields_nodes_topics[];
  openingHours: organizationConnectionFields_nodes_openingHours[];
}

export interface organizationConnectionFields {
  /**
   * A list of nodes.
   */
  nodes: (organizationConnectionFields_nodes | null)[] | null;
}
