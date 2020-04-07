import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Container, Typography } from '@material-ui/core';
import * as Faker from 'faker';
import Chrome from '.';

Faker.seed(123);

storiesOf('Chrome', module)
    .add('default', () => {
        return (
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
    })
    .add('with country', () => {
        return (
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
    });
