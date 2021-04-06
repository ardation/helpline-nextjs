import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Button, Box, NoSsr, SvgIcon } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LanguageIcon from '@material-ui/icons/Language';
import ReactGA, { outboundLink } from 'react-ga';
import { noop } from 'lodash/fp';
import OrganizationOpen from '../OrganizationOpen';
import Chips from '../Chips';
import OrganizationRating from '../OrganizationRating';
import CallIcon from '../../assets/call-icon.svg';
import TextIcon from '../../assets/text-icon.svg';

type OpeningHour = {
    day: string;
    open: string;
    close: string;
};

type HumanSupportType = {
    name: string;
};

type Category = {
    name: string;
};

type Topic = {
    name: string;
};

export type Organization = {
    id: string;
    slug: string;
    name: string;
    alwaysOpen: boolean;
    humanSupportTypes: HumanSupportType[];
    categories: Category[];
    openingHours: OpeningHour[];
    smsNumber?: string;
    phoneNumber?: string;
    url?: string;
    chatUrl?: string;
    timezone: string;
    featured: boolean;
    verified: boolean;
    rating: number;
    reviewCount: number;
};

type Props = {
    organization: Organization;
    variant?: 'widget';
    expandable?: boolean;
    onLink?: () => void;
};

const useStyles = makeStyles((theme) =>
    createStyles({
        box: {
            borderRadius: '10px',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
        },
        grid: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
        },
        header: {
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            marginLeft: theme.spacing(1),
            gridGap: theme.spacing(1),
        },
        heading: {
            '& a': {
                fontFamily: theme.typography.fontFamily,
                fontWeight: 600,
                textDecoration: 'none',
                color: theme.palette.text.primary,
            },
        },
        featured: {
            color: '#FFD300',
            paddingTop: '2px',
        },
        verified: {
            fontSize: 29,
            color: theme.palette.secondary.main,
        },
        button: {
            textTransform: 'none',
            lineHeight: '1.5',
        },
        buttonDisabled: {
            color: `${theme.palette.text.primary} !important`,
            fontWeight: 'normal',
        },
        buttonLink: {
            color: theme.palette.primary.main,
            '& svg': {
                fill: theme.palette.text.primary,
            },
        },
    }),
);

const OrganizationContent = ({ organization, variant, expandable, onLink }: Props): ReactElement => {
    const classes = useStyles();

    const onLinkClick = (label: string, gaEventAction = '') => (): void => {
        const dimension7 = organization.categories.map(({ name }) => name).join(', ');

        ReactGA.event({
            category: 'Helpline Card Engagement',
            action: gaEventAction,
            label: label,
            dimension6: organization.name,
            dimension7: dimension7,
        });
        onLink?.();
        outboundLink({ label }, noop);
    };

    return (
        <>
            {organization.categories.length > 0 && (
                <Box ml={1} data-testid="categories">
                    <Chips items={organization.categories} max={3} />
                </Box>
            )}
            {variant !== 'widget' && (
                <Box ml={1}>
                    <OrganizationRating organization={organization} variant={variant} />
                </Box>
            )}
            {(organization.alwaysOpen || organization.openingHours.length > 0) && (
                <Box data-testid="open">
                    <NoSsr>
                        <OrganizationOpen organization={organization} expandable={expandable} />
                    </NoSsr>
                </Box>
            )}
            {organization.humanSupportTypes.length > 0 && (
                <Box>
                    <Button
                        size="large"
                        classes={{ root: classes.button, disabled: classes.buttonDisabled }}
                        startIcon={<AccountCircleIcon />}
                        disabled
                        data-testid="humanSupportTypes"
                    >
                        {organization.humanSupportTypes.map((humanSupportType) => humanSupportType.name).join(', ')}
                    </Button>
                </Box>
            )}
            {(organization.smsNumber || organization.phoneNumber) && (
                <Box>
                    {organization.smsNumber && (
                        <Button
                            size="large"
                            className={[classes.button, classes.buttonLink].join(' ')}
                            startIcon={
                                <SvgIcon>
                                    <TextIcon />
                                </SvgIcon>
                            }
                            data-testid="smsNumber"
                            onClick={onLinkClick(`sms:${organization.smsNumber}`, 'SMS Number')}
                            href={`sms:${organization.smsNumber}`}
                            target="_parent"
                            rel="noopener noreferrer"
                        >
                            {organization.smsNumber}
                        </Button>
                    )}
                    {organization.phoneNumber && (
                        <Button
                            size="large"
                            className={[classes.button, classes.buttonLink].join(' ')}
                            startIcon={
                                <SvgIcon>
                                    <CallIcon />
                                </SvgIcon>
                            }
                            data-testid="phoneNumber"
                            onClick={onLinkClick(`tel:${organization.phoneNumber}`, 'Phone Number')}
                            href={`tel:${organization.phoneNumber}`}
                            target="_parent"
                            rel="noopener noreferrer"
                        >
                            {organization.phoneNumber}
                        </Button>
                    )}
                </Box>
            )}
            {organization.url && (
                <Box>
                    <Button
                        size="large"
                        className={[classes.button, classes.buttonLink].join(' ')}
                        startIcon={<LanguageIcon />}
                        data-testid="url"
                        onClick={onLinkClick(organization.url, 'Website URL')}
                        href={organization.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {
                            organization.url
                                .replace('http://', '')
                                .replace('https://', '')
                                .replace('www.', '')
                                .split(/[/?#]/)[0]
                        }
                    </Button>
                </Box>
            )}
        </>
    );
};

export default OrganizationContent;
