import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Footer from '../Footer';
import privacy from '../../../docs/privacy.md';
import terms from '../../../docs/terms.md';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabs: {
            marginTop: theme.spacing(2),
        },
        tab: {
            padding: theme.spacing(1, 0),
            textTransform: 'capitalize',
            '&.Mui-selected': {
                fontWeight: 'bold',
            },
        },
    }),
);

type TabType = 'privacy' | 'terms';

interface Props {
    tab: TabType;
}

const Legal = ({ tab }: Props): ReactElement => {
    const classes = useStyles();
    const [value, setValue] = useState(tab);
    const { replace } = useRouter();

    const handleChange = (_event: ChangeEvent<{}>, newValue: TabType): void => {
        setValue(newValue);
        replace(`/${newValue}`);
    };

    return (
        <>
            <NavBar>
                <SideBar />
            </NavBar>
            <Container>
                <TabContext value={value}>
                    <TabList
                        className={classes.tabs}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab className={classes.tab} label="Privacy Policy" value="privacy" />
                        <Tab className={classes.tab} label="Terms of Service" value="terms" />
                    </TabList>
                    <TabPanel value="privacy">
                        <ReactMarkdown source={privacy} escapeHtml={false} />
                    </TabPanel>
                    <TabPanel value="terms">
                        <ReactMarkdown source={terms} escapeHtml={false} />
                    </TabPanel>
                </TabContext>
            </Container>
            <Footer />
        </>
    );
};

export default Legal;
