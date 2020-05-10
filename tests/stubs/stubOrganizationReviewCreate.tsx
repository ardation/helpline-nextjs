import React, { ReactElement } from 'react';
import fetchMock from 'fetch-mock';

const stubOrganizationReviewCreate = (storyFn): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((window as unknown) as any).grecaptcha = {
        execute: (): string => 'abc',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        reset: (): void => {},
    };

    fetchMock.restore().post('https://api.findahelpline.com', {
        data: {
            organizationReviewCreate: {
                clientMutationId: null,
            },
        },
    });
    return <>{storyFn()}</>;
};

export default stubOrganizationReviewCreate;
