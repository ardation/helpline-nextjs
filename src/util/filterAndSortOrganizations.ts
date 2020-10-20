import { find, filter, intersectionBy, sortBy } from 'lodash/fp';
import { Organization } from '../components/OrganizationCard/OrganizationCard';
import isOpen from './isOpen';

type ContactMethod = {
    name: string;
};

type Category = {
    name: string;
};

type HumanSupportType = {
    name: string;
};

type Topic = {
    name: string;
};

type Sort = {
    name: string;
};

export type Filters = {
    categories: Category[];
    contactMethods: ContactMethod[];
    humanSupportTypes: HumanSupportType[];
    topics: Topic[];
    sorts: Sort[];
};

const filterByCategories = (categories: Category[], organization: Organization): boolean => {
    if (categories.length === 0) {
        return true;
    }
    return intersectionBy('name', categories, organization.categories).length > 0;
};

const filterByContactMethods = (contactMethods: ContactMethod[], organization: Organization): boolean => {
    if (contactMethods.length === 0) {
        return true;
    }
    if (find({ name: 'Text' }, contactMethods) && organization.smsNumber) {
        return true;
    }
    if (find({ name: 'Phone' }, contactMethods) && organization.phoneNumber) {
        return true;
    }
    if (find({ name: 'Web Chat' }, contactMethods) && organization.chatUrl) {
        return true;
    }
};

const filterByHumanSupportTypes = (humanSupportTypes: HumanSupportType[], organization: Organization): boolean => {
    if (humanSupportTypes.length === 0) {
        return true;
    }
    return intersectionBy('name', humanSupportTypes, organization.humanSupportTypes).length > 0;
};

const filterByTopics = (topics: Topic[], organization: Organization): boolean => {
    if (topics.length === 0) {
        return true;
    }
    return intersectionBy('name', topics, organization.topics).length > 0;
};

const sortOrganizations = (sorts: Sort[], organizations: Organization[]): Organization[] => {
    if (sorts.length === 0) {
        return organizations;
    }
    if (find({ name: 'Featured' }, sorts)) {
        return sortBy((organization) => {
            const featured = organization.featured ? 'A' : 'B';
            const open = isOpen(organization).open ? `A ${organization.name}` : `B ${organization.name}`;
            return `${featured} ${open} ${organization.name}`;
        }, organizations);
    }
    if (find({ name: 'Verified' }, sorts)) {
        return sortBy((organization) => {
            const verified = organization.verified ? 'A' : 'B';
            const open = isOpen(organization).open ? `A ${organization.name}` : `B ${organization.name}`;
            return `${verified} ${open} ${organization.name}`;
        }, organizations);
    }
    if (find({ name: 'A – Z' }, sorts)) {
        return sortBy('name', organizations);
    }
    if (find({ name: 'Open now' }, sorts)) {
        return sortBy(
            (organization) => (isOpen(organization).open ? `A ${organization.name}` : `B ${organization.name}`),
            organizations,
        );
    }
    if (find({ name: 'Relevance' }, sorts)) {
        return sortBy((organization) => organization.topics.length, organizations);
    }
};

const filterAndSortOrganizations = (
    organizations: Organization[],
    { contactMethods, categories, humanSupportTypes, topics, sorts }: Filters,
): Organization[] => {
    const filteredOrganizations = filter((organization) => {
        return (
            filterByCategories(categories, organization) &&
            filterByContactMethods(contactMethods, organization) &&
            filterByHumanSupportTypes(humanSupportTypes, organization) &&
            filterByTopics(topics, organization)
        );
    }, organizations);
    return sortOrganizations(sorts, filteredOrganizations);
};

export default filterAndSortOrganizations;
