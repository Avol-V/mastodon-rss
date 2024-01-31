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

/**
 * @see https://docs.joinmastodon.org/entities/CustomEmoji/
 */
export type CustomEmoji = {
	shortcode: string,
	url: string,
	static_url: string,
	visible_in_picker: boolean,
	category: string,
};

/**
 * @see https://docs.joinmastodon.org/entities/Account/
 */
export type Account = {
	id: string,
	username: string,
	acct: string,
	url: string,
	display_name: string,
	note: string,
	avatar: string,
	avatar_static: string,
	header: string,
	header_static: string,
	locked: boolean,
	fields: Array<AccountField>,
	emojis: Array<CustomEmoji>,
	bot: boolean,
	group: boolean,
	discoverable: boolean | null,
	noindex?: boolean | null,
	moved?: Account | null,
	suspended?: boolean,
	limited?: boolean,
	created_at: string,
	last_status_at: string | null,
	statuses_count: number,
	followers_count: number,
	following_count: number,
};
export type AccountField = {
	name: string,
	value: string,
	verified_at: string | null,
};

export type Hash = Record<string, unknown>;

/**
 * @see https://docs.joinmastodon.org/entities/MediaAttachment/
 */
export type MediaAttachment = {
	id: string,
	type: 'unknown' | 'image' | 'gifv' | 'video' | 'audio',
	url: string,
	preview_url: string,
	remote_url: string | null,
	meta: Hash,
	description: string | null,
	blurhash: string,
};

/**
 * @see https://docs.joinmastodon.org/entities/Poll/
 */
export type Poll = {
	id: string,
	expires_at: string | null,
	expired: boolean,
	multiple: boolean,
	votes_count: number,
	voters_count: number | null,
	options: Array<PollOption>,
	emojis: Array<CustomEmoji>,
	voted?: boolean,
	own_votes?: Array<number>,
};
export type PollOption = {
	title: string,
	votes_count: number | null,
};

/**
 * @see https://docs.joinmastodon.org/entities/PreviewCard/
 */
export type PreviewCard = {
	url: string,
	title: string,
	description: string,
	type: 'link' | 'photo' | 'video' | 'rich',
	author_name: string,
	author_url: string,
	provider_name: string,
	provider_url: string,
	html: string,
	width: number,
	height: number,
	image: string | null,
	embed_url: string,
	blurhash: string | null,
};

/**
 * @see https://docs.joinmastodon.org/entities/FilterKeyword/
 */
export type FilterKeyword = {
	id: string,
	keyword: string,
	whole_word: boolean,
};

/**
 * @see https://docs.joinmastodon.org/entities/FilterStatus/
 */
export type FilterStatus = {
	id: string,
	status_id: string,
};

/**
 * @see https://docs.joinmastodon.org/entities/Filter/
 */
export type Filter = {
	id: string,
	title: string,
	context: 'home' | 'notifications' | 'public' | 'thread' | 'account',
	expires_at: string | null,
	filter_action: 'warn' | 'hide',
	keywords: Array<FilterKeyword>,
	statuses: Array<FilterStatus>,
};

/**
 * @see https://docs.joinmastodon.org/entities/FilterResult/
 */
export type FilterResult = {
	filter: Filter,
	keyword_matches: Array<string> | null,
	status_matches: Array<string> | null,
};

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
