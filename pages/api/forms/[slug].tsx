import formium from '../../../src/util/formium';

const handler = async (req, res): Promise<void> => {
    const form = await formium.getFormBySlug(req.query.slug);
    res.status(200).json(form);
};

export default handler;
