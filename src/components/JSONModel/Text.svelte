<script lang="ts">
	import type { Mark, TextItem } from '$lib/controllers/types/jsonModel';

	export let props: TextItem;

	function getMark(mark: Mark): [string, string] {
		switch (mark.type) {
			case 'strong':
				return ['<strong>', '</strong>'];

			case 'em':
				return ['<em>', '</em>'];

			default:
				return ['', ''];
		}
	}

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

	// https://stackoverflow.com/a/4835406
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

	$: marks = getMarks(props.marks);
</script>

{@html getOpeningTags(marks) + escapeHtml(props.text) + getClosingTags(marks)}
