export default function fallback(content: string) {
	const code = document.createElement('code');
	code.textContent = content;

	const p = document.createElement('p');
	p.append(code);
	return p.outerHTML;
}
