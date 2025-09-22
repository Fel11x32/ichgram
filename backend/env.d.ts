declare namespace NodeJS {
	interface ProcessEnv {
		PORT?: string;
		NODE_ENV?: 'development' | 'production' | 'test';
		MONGO_URI: string;
		JWT_SECRET: string;
		TOKEN_TTL?: string;
	}
}
