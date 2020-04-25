import { ReactElement } from 'react';

type Props = {
    condition: boolean;
    wrapper: (children: ReactElement) => ReactElement;
    children: ReactElement;
};

const ConditionalWrapper = ({ condition, wrapper, children }: Props): ReactElement =>
    condition ? wrapper(children) : children;

export default ConditionalWrapper;
