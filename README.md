This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Helpline Widget

The helpine widget code can be found in `./src/widget/widget.js` and is bundled and minified using it's own `./webpack.config.js`.

The three target enviornments for building are `dev`, `staging`, and `production` and these script refrences can be found in the `./package.json`. The mechanism that controls which build to generate is the `STAGING` environment property which can be passed in at run time or defined in a `.env` file. This controls which host origin url to provide to the widget, bundles and minifies the code, and then places this `widget.min.js` in the `./public` folder of the application.

Please ensure this is run before you run the application. The `npm run dev` command has been updated to ensure this happens when running locally but this is not the case with `npm run build` or `npm run start` as these calls will need to come from the respective environment pipelines.

### Embedding the Helpline Widget (localhost)

While the app is running, place the below snippet inside and before the closing `<body>` tag of a `.html` file and view that file locally on your browser.

```html
<div id="widget"></div>

<script src="http://localhost:3000/widget.min.js"></script>
<script type="text/javascript">
    Widget.default.render(
        {
            countryCode: 'US',
        },
        '#widget',
    );
</script>
```
