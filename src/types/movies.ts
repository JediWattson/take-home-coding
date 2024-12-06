export interface MovieReqOptions {
	method: string;
	headers: {
		accept: string;
		Authorization: string;
	}
}

export interface MovieQuery {
	language: string;
	page: number;
	sort_by: string;
}

export interface MovieItem {
	id: string;
	original_title: string;
	release_date: string;
	vote_average: number;
}

export interface CrewItem {
	original_name: string;
	known_for_department: string;
}


