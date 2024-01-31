export type Config = {
	instance: string,
	dropOlderThanHours: number,
	timelineJsonPath: string,
	rssDirectoryPath: string,
	clientId?: string,
	clientSecret?: string,
	accessToken?: string,
};
