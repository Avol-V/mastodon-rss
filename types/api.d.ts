/**
 * @see https://docs.joinmastodon.org/methods/apps/#create
 */
export type PostApiAppsResponse = {
	id: string,
	name: string,
	website: sting | null,
	redirect_uri: string,
	client_id: string,
	client_secret: string,
	vapid_key: string,
};

/**
 * @see https://docs.joinmastodon.org/methods/oauth/#token
 */
export type PostOauthTokenResponse = {
	access_token: string,
	token_type: string,
	scope: string,
	created_at: number,
};

export type Account = {};
export type MediaAttachment = {};
export type CustomEmoji = {};
export type Poll = {};
export type PreviewCard = {};
export type FilterResult = {};

/**
 * @see https://docs.joinmastodon.org/entities/Status/
 */
export type Status = {
	id: string,
	uri: string,
	created_at: string,
	account: Account,
	content: string,
	visibility: 'public' | 'unlisted' | 'private' | 'direct',
	sensitive: boolean,
	spoiler_text: string,
	media_attachments: Array<MediaAttachment>,
	application?: {
		name: string,
		website: string | null,
	},
	mentions: Array<StatusMention>,
	tags: Array<StatusTag>,
	emojis: Array<CustomEmoji>,
	reblogs_count: number,
	favourites_count: number,
	replies_count: number,
	url: string | null,
	in_reply_to_id: string | null,
	in_reply_to_account_id: string | null,
	reblog: Status | null,
	poll: Poll | null,
	card: PreviewCard | null,
	language: string | null,
	text: string | null,
	edited_at: string | null,
	favourited?: boolean,
	reblogged?: boolean,
	muted?: boolean,
	bookmarked?: boolean,
	pinned?: boolean,
	filtered?: Array<FilterResult>,
};
export type StatusMention = {
	id: string,
	username: string,
	url: string,
	acct: string,
};
export type StatusTag = {
	name: string,
	url: string,
};

/**
 * @see https://docs.joinmastodon.org/methods/timelines/#home
 */
export type GetApiTimelinesHomeQuery = {
	max_id?: string,
	since_id?: string,
	min_id?: string,
	limit?: number,
};

/**
 * @see https://docs.joinmastodon.org/methods/timelines/#home
 */
export type GetApiTimelinesHomeResponse = Array<Status>;
