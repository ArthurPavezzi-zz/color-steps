<template>
  <color-steps/>
  <footer>
    <h3>Feito por <a href="https://github.com/ArthurPavezzi">Arthur Pavezzi</a></h3>
  </footer>
</template>

<script>
import ColorSteps from './components/ColorSteps'

export default {
  name: 'App',
  components: {
    ColorSteps
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400&display=swap');
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0 0 4em 0;
  min-height: 100vh;
  display: flex;
  background: #000;
  font-family: 'Nunito', sans-serif;
}

footer {
  display: flex;
  justify-content: center;
  background-color: dimgrey;
  position: fixed;
  height: 4em;
  left: 0;
  bottom: 0;
  width: 100%;
}

h3 {
  color: #000;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
