[...document.querySelectorAll('input:not([required])[type="checkbox"]')]
    .filter(x => x.checked)
    .forEach(x => x.click())