
# Epyc Slider webflow app

Epyc Slider is a no-code Webflow plugin that integrates Swiper.js, enabling you to create stunning, responsive sliders and carousels without any coding knowledge.

# Features
- No-Code Integration: Build sliders effortlessly with an intuitive interface.
- Responsive Design: Fully optimized for all devices.
- Customizable Options: Easily adjust layouts, animations, autoplay, navigation styles, and more.
- Webflow Compatible: Seamlessly integrates into Webflow Designer for smooth workflows.

# Steps to run locally 

- Clone the project using command 

```
git clone https://github.com/teamEPYC/epyc-slider-webflow-app.git
```
- Navigate to the projects directory. 
- Open two terminal, and run the following command in them respectivly. 

```
cd epyc-slider-worker
```
``` 
cd slider-plugin 
```

- Create an app on webflow and get your client id and cexret from webflow 
- Create a .dev.vars file in epyc-slider-workers and fill in the environment variables there.
- You can get your redirect url from cloudflare workers if you are testing locally, use ngrok tunnel.  
```
WEBFLOW_CLIENT_ID = ""
WEBFLOW_CLIENT_SECRET = ""
REDIRECT_URL = ""
JWT_SECRET=""
```
- Update your Installation url and callback url in webfllow app settingd. If your redirect url is "xyz.com" then your installation url and callback url are "xyz.com/auth" and "xyz.com/auth/callback" respectivly. 

- for running the application run the following command in both the terminals. 
```
npm run dev
```
- Additonaly in slider-plugin termial run the following command to make tailwind css work. 
```
npx tailwindcss -i ./src/input.css -o ./public/styles.css --watch
``` 

