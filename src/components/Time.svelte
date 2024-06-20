<script lang="ts">
	import type { PostTime } from '$lib/responses/Post';

	export let time: PostTime;
	let date = new Date(time.epochSecond * 1000 + time.nano / 1000);
	let localeTime = date.toLocaleString();

	const FULL_TIMES_MS = {
		day: 3600 * 24 * 1000,
		hour: 3600 * 1000,
		minute: 60 * 1000,
		second: 1 * 1000,
	};

	function getFullTime(date: Date) {
		const relativeTime = Date.now() - date.valueOf();
		if (relativeTime >= FULL_TIMES_MS.day * 6) {
			return date.toLocaleDateString();
		}
		// if > 5 days then just returns date string

		for (const time of Object.entries(FULL_TIMES_MS)) {
			if (relativeTime > time[1]) {
				const i = Math.floor(relativeTime / time[1]);
				return `${i}${time[0][0]}`;
			}
		}

		return 'now';
	}
</script>

<time datetime={localeTime} title={localeTime}>{getFullTime(date)}</time>
