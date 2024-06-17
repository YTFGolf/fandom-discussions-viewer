<script lang="ts">
	import type { Mark, TextItem } from '$lib/controllers/types/jsonModel';

	export let props: TextItem;
	const elem = document.createElement.bind(document);

	function getElement(mark: Mark): HTMLElement | undefined {
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

	function getElements(marks?: Mark[]): HTMLElement[] {
		if (!marks) {
			return [];
		}

		const elements = [];
		for (const mark of marks) {
			const element = getElement(mark);
			if (element) {
				elements.push(element);
			}
		}
		console.log(elements);

		return elements;
	}

	function getHtml(props: TextItem) {
		const dummy = elem('body');
		let outer: HTMLElement = dummy;

		const elements = getElements(props.marks);
		for (const element of elements.reverse()) {
			outer.append(element);
			outer = element;
		}
		outer.textContent = props.text;

		return dummy.innerHTML;
	}
</script>

{@html getHtml(props)}
