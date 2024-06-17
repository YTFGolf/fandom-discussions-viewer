<script lang="ts">
	import type { Mark, TextItem } from '$lib/controllers/types/jsonModel';

	export let props: TextItem;
	const elem = document.createElement.bind(document);

	function getMark(mark: Mark): HTMLElement | undefined {
		switch (mark.type) {
			case 'strong':
				return elem('strong');

			case 'em':
				return elem('em');

			case 'link':
				const link = elem('a');
				link.href = mark.attrs.href;
				link.target = '_blank';
				return link;

			case 'mention':
				let mention = elem('a');
				mention.href = '/f/u/' + mark.attrs.userId;
				mention.target = '_blank';
				mention.className = 'mention';
				return mention;

			default:
				return;
		}
	}

	/**
	 *
	 * @param marks List of marks from the TextItem.
	 * @returns List of tag open/close pairs e.g. `[['<a>', '</a>']]`.
	 */
	function getMarks(marks?: Mark[]): HTMLElement[] {
		if (!marks) {
			return [];
		}

		const tags = [];
		for (const mark of marks) {
			const element = getMark(mark);
			if (element) {
				tags.push(element);
			}
		}
		console.log(tags);

		return tags;
	}

	function getHtml(props: TextItem) {
		const dummy = elem('body');
		let outer: HTMLElement = dummy;

		const marks = getMarks(props.marks);
		for (const mark of marks.reverse()) {
			outer.append(mark);
			outer = mark;
		}
		outer.textContent = props.text;

		return dummy.innerHTML;
	}
</script>

{@html getHtml(props)}
