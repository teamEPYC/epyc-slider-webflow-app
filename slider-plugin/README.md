# Designer Extension Starter: React

Explore the [documentation](https://developers.webflow.com/designer/reference/introduction) for detailed information on Designer Extension features and API.

## Local Development

```bash
npm run dev
```
For running tailwind CSS run the following command 
```bash
npx tailwindcss -i ./src/input.css -o ./public/styles.css --watch
```

This command installs dependencies, watches for changes in the `src/` folder, and serves your extension files from `./dist/`. Use the displayed URL as the "Development URL" in Webflow Designer's Apps panel to launch your extension.

## Build for Distribution

```bash
npm run build
```

This command prepares a `${bundleFile}` in the `./dist/` folder. Upload this `bundle.zip` file for distributing the App inside of your workspace or via the Marketplace.
# Epyc-Slider-Webflow-Plugin
