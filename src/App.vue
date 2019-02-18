<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: "B612 Mono";
  font-style: italic;
  font-weight: 400;
  src: local("B612 Mono Italic"), local("B612Mono-Italic"),
    url("./assets/fonts/B612Mono-Italic.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: "B612 Mono";
  font-style: italic;
  font-weight: 700;
  src: local("B612 Mono Bold Italic"), local("B612Mono-BoldItalic"),
    url("./assets/fonts/B612Mono-BoldItalic.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: "B612 Mono";
  font-style: normal;
  font-weight: 400;
  src: local("B612 Mono Regular"), local("B612Mono-Regular"),
    url("./assets/fonts/B612Mono-Regular.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@font-face {
  font-family: "B612 Mono";
  font-style: normal;
  font-weight: 700;
  src: local("B612 Mono Bold"), local("B612Mono-Bold"),
    url("./assets/fonts/B612Mono-Bold.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

:root {
  --dark: #0a0012;
  --mid: #0f0d1f;
  --light: #1a2230;
  --primary: #b2f6ff;
  --secondary: #db698a;
}

::selection {
  background-color: var(--secondary);
}

::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(0, 0, 0, 0);
  -webkit-border-radius: 100px;
}

::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 100px;
}

::-webkit-scrollbar-thumb:vertical:active {
  background: rgba(0, 0, 0, 0.61);
  -webkit-border-radius: 100px;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: "B612 Mono", Courier, monospace;
  background-color: var(--dark);
  color: var(--primary);
  cursor: default;
}

mark {
  background-color: var(--primary);
}

input,
select {
  font-family: "B612 Mono", Courier, monospace;
}

.small {
  font-size: 0.75rem;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.center {
  text-align: center;
}

.justify {
  text-align: justify;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.column {
  flex-basis: 100%;
}

@media screen and (min-width: 480px) {
  .column {
    flex: 1;
  }

  ._25 {
    flex: 2.5;
  }

  ._33 {
    flex: 3.33;
  }

  ._50 {
    flex: 5;
  }

  ._66 {
    flex: 6.66;
  }

  ._75 {
    flex: 7.5;
  }
}
</style>
