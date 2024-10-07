class MyAppsTime {
	constructor() {
		this.api = "https://apiv2.myappstime.com/api"
		this.headers = {
			"user-agent": "okhttp/4.9.0"
		}
	}

	async login(email, password) {
		const response = await fetch(
			`${this.api}/v2/auth/login`, {
				method: "POST",
				body: JSON.stringify({
					mail: email,
					password: password
				}),
				headers: this.headers
			})
		return response.json()
	}

	async login_with_google(token) {
		const response = await fetch(
			`${this.api}/v2/oauth/google/redirect`, {
				method: "POST",
				body: JSON.stringify({
					token: token
				}),
				headers: this.headers
			})
		const data = await response.json()
		if (data.status === "OK") {
			this.token = data.data.token
			this.headers["apps"] = this.token
			this.userId = await this.getCurrentUser().data.userId
		}
	}
	
	async getCurrentUser() {
		const response = await fetch(
			`${this.api}/v2/users/profile`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getAppsSettings() {
		const response = await fetch(
			`${this.api}/v2/my/apps/settings`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getPosts(limit = 20) {
		const response = await fetch(
			`${this.api}/v2/posts/live?limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getUserInfo(userId) {
		const response = await fetch(
			`${this.api}/v2/users/userById?userId=${userId}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getUserAppsTime(userId) {
		const response = await fetch(
			`${this.api}/v2/apps/time/wk?userId=${userId}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getUserFollowers(userId, offset = 0, limit = 20) {
		const response = await fetch(
			`${this.api}/v2/friendships/user/followers?userId=${userId}&offset=${offset}&limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getUserFollowings(userId, offset = 0, limit = 20) {
		const response = await fetch(
			`${this.api}/v2/friendships/user/subscriptions?userId=${userId}&offset=${offset}&limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async searchUser(query, offset = 0, limit = 20) {
		const response = await fetch(
			`${this.api}/v2/users/allUsers?displayName=${query}&offset=${offset}&limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async editProfile(displayName = null, about = null, avatarUrl = null) {
		const body = {}
		if (displayName) {
			body.displayName = displayName
		}
		if (about) {
			body.about = about
		}
		if (avatarUrl) {
			body.avatar = avatarUrl
		}
		const response = await fetch(
			`${this.api}/v2/users/profile`, {
				method:"POST",
				body: JSON.stringify(body),
				headers: this.headers
			})
		return response.json()
	}

	async createPost(body, image = null, packageName = null) {
		const data = {body}
		if (image) {
			data.img = image
		}
		if (packageName) {
			data.packageName = packageName
		}
		const response = await fetch(
			`${this.api}/v2/post/create`, {
				method:"POST",
				body: JSON.stringify(data),
				headers: this.headers
			})
		return response.json()
	}

	async deletePost(postId) {
		const response = await fetch(
			`${this.api}/v2/post/drop?postId=${postId}`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}
}

module.exports = {MyAppsTime}
