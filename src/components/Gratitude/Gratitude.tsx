import React, { ReactElement } from 'react';
import { Container, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Footer from '../Footer';
import gratitude from '../../../docs/gratitude.md';

const Gratitude = (): ReactElement => {
    return (
        <>
            <NavBar>
                <SideBar />
            </NavBar>
            <Container>
                <Typography component="div">
                    <ReactMarkdown source={gratitude} escapeHtml={false} />
                </Typography>
            </Container>
            <Footer />
        </>
    );
};

export default Gratitude;
