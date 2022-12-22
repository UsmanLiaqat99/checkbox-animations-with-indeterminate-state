window.addEventListener("DOMContentLoaded",() => {
	const checklist = new Checklist("form");
});

class Checklist {
	constructor(qs) {
		this.el = document.querySelector(qs);
		this.el?.addEventListener("change",this.checkForSelected.bind(this));
		this.init();
	}
	init() {
		const inputs = this.el.querySelectorAll("input");
		Array.from(inputs).forEach(el => {
			el.checked = false;
		});
	}
	checkForSelected(e) {
		const tar = e.target;
		const isTop = tar.hasAttribute("data-top");

		this.updateChecks(tar.name,isTop);
	}
	updateChecks(name,isTop) {
		if (name) {
			const topCheck = this.el.querySelector(`[name="${name}"][data-top]`);
			const checkItems = this.el.querySelectorAll(`[name="${name}"]:not([data-top])`);
			const checked = Array.from(checkItems).filter(el => el.checked);
			const notAllChecked = checked.length < checkItems.length;

			if (isTop) {
				Array.from(checkItems).forEach(el => {
					el.checked = notAllChecked;
				});
			} else {
				topCheck.checked = !notAllChecked;
				topCheck.indeterminate = checked.length > 0 && notAllChecked;
			}
		}
	}
}