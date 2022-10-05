import requests

class MyAppsTime:
	def __init__(self):
		self.api = "https://apiv2.myappstime.com/api"
		self.headers = {
			"user-agent": "okhttp/4.9.0"
		}
		self.token = None
		self.user_id = None

	def login(self, email: str, password: str):
		data = {
			"mail": email,
			"password": password
		}
		return requests.post(
			f"{self.api}/v2/auth/login",
			json=data,
			headers=self.headers).json()


	def login_with_google(self, token: str):
		data = {
			"token": token
		}
		response = requests.post(
			f"{self.api}/v2/oauth/google/redirect",
			json=data,
			headers=self.headers).json()
		if response["status"] == "OK":
			self.token = response["data"]["token"]
			self.headers["apps"] = self.token
			self.user_id = self.get_current_user()["data"]["userId"]
		return response

	def get_current_user(self):
		return requests.get(
			f"{self.api}/v2/users/profile",
			headers=self.headers).json()

	def add_apps_time(self, apps: list, times: list):
		data = {"appTime": []}
		for app, time in zip(apps, times):
			data["appTime"].append(
				{
					"packageName": app,
					"time": time
				}
			)
		return requests.put(
			f"{self.api}/v2/apps/time/wk",
			json=data,
			headers=self.headers).json()

	def get_apps_settings(self):
		return requests.get(
			f"{self.api}/v2/my/apps/settings",
			headers=self.headers).json()

	def get_posts(self, limit: int = 20):
		return requests.get(
			f"{self.api}/v2/post/live?limit={limit}",
			headers=self.headers).json()

	def get_user_info(self, user_id: str):
		return requests.get(
			f"{self.api}/v2/users/userById?userId={user_id}",
			headers=self.headers).json()

	def get_user_apps_time(self, user_id: str):
		return requests.get(
			f"{self.api}/v2/apps/time/wk?userId={user_id}",
			headers=self.headers).json()

	def get_user_followers(
			self,
			user_id: str,
			offset: int = 0,
			limit: int = 20):
		return requests.get(
			f"{self.api}/v2/friendships/user/followers?userId={user_id}&offset={offset}&limit={limit}",
			headers=self.headers).json()


	def get_user_followings(
			self,
			user_id: str,
			offset: int = 0,
			limit: int = 20):
		return requests.get(
			f"{self.api}/v2/friendships/user/subscriptions?userId={user_id}&offset={offset}&limit={limit}",
			headers=self.headers).json()

	def search_user(
			self,
			query: str,
			offset: int = 0,
			limit: int = 20):
		return requests.get(
			f"{self.api}/v2/users/allUsers?displayName={query}&offset={offset}&limit={limit}",
			headers=self.headers).json()

	def edit_profile(
			self,
			display_name: str = None,
			about: str = None,
			avatar_url: str = None):
		data = {}
		if display_name:
			data["displayName"] = display_name
		if about:
			data["about"] = about
		if avatar_url:
			data["avatar"] = avatar
		return requests.post(
			f"{self.api}/v2/users/profile",
			json=data,
			headers=self.headers).json()

	def create_post(
			self,
			body: str,
			image: str = None,
			package_name: str = None):
		data = {
			"body": body
		}
		if image:
			data["img"] = image
		if package_name:
			data["packageName"] = package_name
		return requests.post(
			f"{self.api}/v2/post/create",
			json=data,
			headers=self.headers).json()

	def delete_post(self, post_id: str):
		return requests.delete(
			f"{self.api}/v2/post/drop?postId={post_id}",
			headers=self.headers).json()

	def update_stats(self):
		data = {"mail": "1"}
		return requests.post(
			f"{self.api}/v2/users/profile",
			json=data,
			headers=self.headers).json()
