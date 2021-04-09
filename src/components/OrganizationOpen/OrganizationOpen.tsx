import React, { ReactElement, useState } from 'react';
import {
    createStyles,
    makeStyles,
    Typography,
    Chip,
    Button,
    IconButton,
    Box,
    Grid,
    Collapse,
    SvgIcon,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import moment from 'moment-timezone';
import { compact } from 'lodash/fp';
import isOpen from '../../util/isOpen';
import TimeIcon from '../../assets/time-icon.svg';

type OpeningHour = {
    day: string;
    open: string;
    close: string;
};

type Organization = {
    alwaysOpen: boolean;
    openingHours: OpeningHour[];
    timezone: string;
};

type Props = {
    organization: Organization;
    expandable?: boolean;
};

const useStyles = makeStyles((theme) =>
    createStyles({
        body: {
            fontSize: 'inherit',
            fontWeight: 'normal',
        },
        open: {
            color: '#3FA607',
            fontWeight: 600,
        },
        chip: {
            color: '#FFFFFF',
            fontWeight: 600,
            backgroundColor: theme.palette.secondary.main,
            marginTop: -2,
            marginLeft: theme.spacing(1),
            borderRadius: 5,
        },
        button: {
            textTransform: 'none',
            lineHeight: '1.5',
            textAlign: 'left',
            alignItems: 'flex-start',
        },
        buttonDisabled: {
            color: `${theme.palette.text.primary} !important`,
        },
        openingHour: {
            display: 'inline-block',
            fontWeight: 'inherit',
            fontSize: theme.typography.fontSize,
        },
        day: {
            width: '100px',
            textTransform: 'capitalize',
        },
        active: {
            fontWeight: 'bold',
        },
        svgIcon: {
            width: '0.9em',
            height: '0.9em',
        },
    }),
);

const OrganizationOpen = ({ organization, expandable }: Props): ReactElement => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const openStatus = isOpen(organization);

    const toTime = (time: string): string => {
        const date = moment.tz(organization.timezone).format('YYYY-MM-DD');
        return moment
            .tz(`${date} ${time.match(/T(\d\d:\d\d)/)[1]}`, 'YYYY-MM-DD HH:mm', organization.timezone)
            .local()
            .format('h:mm A');
    };

    return (
        <>
            <Button
                size="large"
                classes={{ root: classes.button, disabled: classes.buttonDisabled }}
                startIcon={
                    <SvgIcon className={classes.svgIcon}>
                        <TimeIcon />
                    </SvgIcon>
                }
                disabled
            >
                <Typography className={classes.body} component="div">
                    {organization.alwaysOpen && (
                        <>
                            <span className={classes.open}>Open</span>{' '}
                            <Chip size="small" className={classes.chip} label="24/7" />
                        </>
                    )}
                    {!organization.alwaysOpen && (
                        <>
                            {openStatus.open && (
                                <>
                                    <span className={classes.open}>Open</span>
                                    <br />
                                    <span>
                                        {openStatus.openTime.local().format('h:mm A')}–
                                        {openStatus.closeTime.local().format('h:mm A')}
                                    </span>
                                </>
                            )}
                            {!openStatus.open && <span>Closed</span>}
                        </>
                    )}
                </Typography>
            </Button>
            {!organization.alwaysOpen && expandable && (
                <>
                    <IconButton size="small" data-testid="expandable" onClick={(): void => setExpanded(!expanded)}>
                        {expanded && <CloseIcon />}
                        {!expanded && <ExpandMoreIcon />}
                    </IconButton>
                    <Collapse in={expanded}>
                        <Box ml={5}>
                            <Grid container direction="column" spacing={1}>
                                {organization.openingHours.map((openingHour, index) => (
                                    <Grid
                                        className={compact([
                                            openStatus.open && openStatus.day === openingHour.day && classes.active,
                                        ]).join(' ')}
                                        item
                                        key={index}
                                    >
                                        <Typography
                                            className={[classes.openingHour, classes.day].join(' ')}
                                            component="div"
                                        >
                                            {openingHour.day}
                                        </Typography>{' '}
                                        <Typography className={classes.openingHour} component="div">
                                            {toTime(openingHour.open)}–{toTime(openingHour.close)}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Collapse>
                </>
            )}
        </>
    );
};

export default OrganizationOpen;
