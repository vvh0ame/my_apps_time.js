# my_apps_time.js
Mobile-API for [My Apps Time](https://play.google.com/store/apps/details?id=org.coober.myappstime) the most easy-to-use and lightweight tool for app usage tracking

## Example
```JavaScript
async function main() {
	const { MyAppsTime } = require("./my_apps_time.js")
	const myAppsTime = new MyAppsTime()
	await myAppsTime.loginWithGoogleToken("token")
}

main()
```
