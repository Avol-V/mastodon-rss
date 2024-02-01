# mastodon-rss

[![npm version](https://badge.fury.io/js/mastodon-rss.svg)](https://www.npmjs.com/package/mastodon-rss)

Generates RSS feed from Mastodon home timeline.

Creates separate RSS files for each account you following. But unlike the built-in RSS feed, here the feed is formed from a timeline and includes all types of activity, including boosts.

## How to use

### Installation

The script is written in Node.js and can be installed via NPM:

```sh
npm install -g mastodon-rss
```

### Initialize and login

To initialize configuration, register application and generate authorization token, run **mastodon-rss** with `--login` key.

For example:
```sh
mastodon-rss --config=/etc/mastodon-rss/config.json --instance=https://mastodon.social --login
```

Here we additionally specify the path to the configuration file and the URL of the Mastodon instance, that will be used to interact with the API.

Default configuration path is:  
`~/.config/mastodon-rss/config.json`

Default instance is:  
`https://mastodon.social`

### Generate RSS files for each following account

Let's create RSS files for all following accounts. They will contain only a description of the channel, without posts. This is necessary so that you can already subscribe to channels without waiting for a post from this user to appear in your timeline.

You need to specify your account name here. For example:
```sh
mastodon-rss --config=/etc/mastodon-rss/config.json --prepare-following-for=avol_v@mastodon.social
```

### Parse current home timeline and fill RSS files with posts

Run it regularly, for example in a CRON task:

```sh
mastodon-rss --config=/etc/mastodon-rss/config.json
```

## Settings

You can change some setting in the config file:

- `dropOlderThanHours` — posts older than this value will be removed from RSS file (`24` by default).
- `timelineJsonPath` — where to store timeline cache (`timeline.json` near the config file by default).
- `rssDirectoryPath` — directory where to store RSS files (`feeds` near the config file by default).
