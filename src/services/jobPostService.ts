import { XANO_BASE_URL } from './apiConfig';

export interface CreateJobPostData {
	team_id: string;
	title: string;
	number_of_hires?: string;
	hire_timeline?: string;
	employment_type?: string;
	location_preference?: string;
	city?: string;
	salary_min?: string;
	salary_max?: string;
	equity_available?: boolean;
	 salary_period?: string; // 'Yearly' | 'Monthly'
	 currency?: string; // e.g., 'USD', 'INR'
	// Add more optional fields as needed for job persona details later
}

export interface JobPostResponse {
	success: boolean;
	message?: string;
	job_post?: any;
	job_posts?: any[];
}

class JobPostService {
	private getAuthHeaders(): HeadersInit {
		const token = localStorage.getItem('authToken');
		return {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` }),
		};
	}

	async createJobPost(data: CreateJobPostData): Promise<JobPostResponse> {
		try {
			const response = await fetch(`${XANO_BASE_URL}/job_post`, {
				method: 'POST',
				headers: this.getAuthHeaders(),
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const job_post = await response.json();
				return { success: true, job_post };
			}

			let message = 'Failed to create job post';
			try {
				const err = await response.json();
				message = err?.message || message;
			} catch {}
			return { success: false, message };
		} catch (e) {
			return { success: false, message: 'Network error occurred' };
		}
	}

	async updateJobPost(id: string, data: Partial<CreateJobPostData> & Record<string, any>): Promise<JobPostResponse> {
		try {
			const response = await fetch(`${XANO_BASE_URL}/job_post/${id}`, {
				method: 'PATCH',
				headers: this.getAuthHeaders(),
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const job_post = await response.json();
				return { success: true, job_post };
			}

			let message = 'Failed to update job post';
			try {
				const err = await response.json();
				message = err?.message || message;
			} catch {}
			return { success: false, message };
		} catch (e) {
			return { success: false, message: 'Network error occurred' };
		}
	}

	async getJobPostsByTeam(teamId: string): Promise<JobPostResponse> {
		try {
			const response = await fetch(`${XANO_BASE_URL}/job_post?team_id=${encodeURIComponent(teamId)}`, {
				method: 'GET',
				headers: this.getAuthHeaders(),
			});
			if (response.ok) {
				const job_posts = await response.json();
				return { success: true, job_posts };
			}
			let message = 'Failed to fetch job posts';
			try {
				const err = await response.json();
				message = err?.message || message;
			} catch {}
			return { success: false, message };
		} catch (e) {
			return { success: false, message: 'Network error occurred' };
		}
	}
}

export const jobPostService = new JobPostService();


