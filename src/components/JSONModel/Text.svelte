<script lang="ts">
	import type { Mark, TextItem } from '$lib/controllers/types/jsonModel';

	export let props: TextItem;

	// https://stackoverflow.com/a/4835406
	/**
	 * IMPORTANT: USE THIS ON ANYTHING THAT IS NOT FIXED IN THE CODE
	 */
	function escapeHtml(text: string): string {
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;',
		};

		return text.replace(/[&<>"']/g, function (m) {
			// @ts-ignore
			return map[m];
		});
	}

	function getMark(mark: Mark): [string, string] {
		switch (mark.type) {
			case 'strong':
				return ['<strong>', '</strong>'];

			case 'em':
				return ['<em>', '</em>'];

			case 'link':
				return [`<a href="${escapeHtml(mark.attrs.href)}" target="_blank">`, '</a>'];

			case 'mention':
				return [
					`<a class="mention" href="/f/u/${escapeHtml(mark.attrs.userId)}" target="_blank">`,
					// TODO use actual wiki, also differentiate between normal
					// links and mentions
					'</a>',
				];

			default:
				return ['', ''];
		}
	}

	/**
	 *
	 * @param marks List of marks from the TextItem.
	 * @returns List of tag open/close pairs e.g. `[['<a>', '</a>']]`.
	 */
	function getMarks(marks?: Mark[]): [string, string][] {
		if (!marks) {
			return [];
		}

		const tags = [];
		for (const mark of marks) {
			tags.push(getMark(mark));
		}

		return tags;
	}

	function getOpeningTags(marks: [string, string][]): string {
		return marks
			.map((tag) => tag[0])
			.reverse()
			.join('');
	}

	function getClosingTags(marks: [string, string][]): string {
		return marks
			.map((tag) => tag[0])
			.reverse()
			.join('');
	}

	$: marks = getMarks(props.marks);
</script>

<!--
All interpolated strings are escaped and all other strings are constant values
so there should not be any XSS opportunity.
-->
{@html getOpeningTags(marks) + escapeHtml(props.text) + getClosingTags(marks)}
