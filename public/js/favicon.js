function faviconInsertion() {
const favicon = document.createTextNode(`<link rel="apple-touch-icon" sizes="180x180" href="/img/logo.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/img/logo.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/img/logo.png"/>
<link rel="mask-icon" href="/safari-pinned-tab.svg"  color="#5bbad5"/>
<meta name="msapplication-TileColor" content="#da532c"/>
<meta name="theme-color" content="#ffffff"/>`);

document.head.appendChild(favicon);
}
faviconInsertion();

