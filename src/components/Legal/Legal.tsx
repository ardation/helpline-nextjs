import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Container, Tab, Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import privacy from '../../../docs/privacy.md';
import terms from '../../../docs/terms.md';

type TabType = 'privacy' | 'terms';

interface Props {
    tab: TabType;
}

const Legal = ({ tab }: Props): ReactElement => {
    const [value, setValue] = useState(tab);
    const { replace } = useRouter();

    const handleChange = (_event: ChangeEvent<{}>, newValue: TabType): void => {
        setValue(newValue);
        replace(`/${newValue}`);
    };

    return (
        <Container>
            <TabContext value={value}>
                <TabList onChange={handleChange} variant="fullWidth">
                    <Tab label="Privacy Policy" value="privacy" />
                    <Tab label="Terms of Service" value="terms" />
                </TabList>
                <TabPanel value="privacy">
                    <Typography component="div">
                        <ReactMarkdown source={privacy} escapeHtml={false} />
                    </Typography>
                </TabPanel>
                <TabPanel value="terms">
                    <Typography component="div">
                        <ReactMarkdown source={terms} escapeHtml={false} />
                    </Typography>
                </TabPanel>
            </TabContext>
        </Container>
    );
};

export default Legal;
