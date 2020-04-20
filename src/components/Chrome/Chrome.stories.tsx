import React, { Fragment, ReactElement } from 'react';
import { Container, Typography } from '@material-ui/core';
import * as Faker from 'faker';
import Chrome from '.';

Faker.seed(123);

export default {
    title: 'Chrome',
};

export const Default = (): ReactElement => (
    <Fragment>
        <Chrome>
            <Container>
                {[1, 2, 3, 4, 5].map((v) => (
                    <Typography key={v}>{Faker.lorem.paragraph(50)}</Typography>
                ))}
            </Container>
        </Chrome>
    </Fragment>
);

export const WithCountry = (): ReactElement => (
    <Fragment>
        <Chrome country={{ emergencyNumber: '111' }}>
            <Container>
                {[1, 2, 3, 4, 5].map((v) => (
                    <Typography key={v}>{Faker.lorem.paragraph(50)}</Typography>
                ))}
            </Container>
        </Chrome>
    </Fragment>
);
