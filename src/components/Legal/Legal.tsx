import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Box, Container, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useRouter } from 'next/router';
import privacy from '../../../docs/privacy.md';
import terms from '../../../docs/terms.md';
import Markdown from '../Markdown';

type TabType = 'privacy' | 'terms';

interface Props {
    tab: TabType;
}

const Legal = ({ tab }: Props): ReactElement => {
    const [value, setValue] = useState(tab);
    const { replace } = useRouter();

    const handleChange = (_event: ChangeEvent, newValue: TabType): void => {
        setValue(newValue);
        replace(`/${newValue}`);
    };

    return (
        <TabContext value={value}>
            <Box bgcolor="background.paper" py={2}>
                <Container maxWidth="sm">
                    <TabList onChange={handleChange} variant="fullWidth">
                        <Tab label="Privacy Policy" value="privacy" />
                        <Tab label="Terms of Service" value="terms" />
                    </TabList>
                </Container>
                <TabPanel value="privacy">
                    <Markdown source={privacy} />
                </TabPanel>
                <TabPanel value="terms">
                    <Markdown source={terms} />
                </TabPanel>
            </Box>
        </TabContext>
    );
};

export default Legal;
