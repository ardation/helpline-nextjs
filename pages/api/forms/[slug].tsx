import { NextApiRequest, NextApiResponse } from 'next';
import formium from '../../../src/util/formium';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const form = await formium.getFormBySlug(req.query.slug.toString());
    res.status(200).json(form);
};

export default handler;
