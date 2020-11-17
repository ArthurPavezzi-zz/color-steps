<template>
  <main>
    <div class="tools">
      <div>
        <input type="color" v-model="color1"/>
        <input type="text" v-model="color1"/>
      </div>
      <div>
        <div class="vertical-range"><input type="range" :min="min" :max="max" v-model="steps"/></div>
        <div class="steps"><p>{{ visualSteps }} {{ visualStepsLabel }}</p></div>
      </div>
      <div>
        <input type="color" v-model="color2">
        <input type="text" v-model="color2">
      </div>
    </div>
    <div class="colors">
      <div class="color" v-for="(color, index) in colors" :key="index" :style="setStyles(color)">
        &nbsp;{{ colorName(color) }}
      </div>
    </div>
  </main>
</template>
<script>
import vueMixinColorFunctions from "@/components/vueMixinColorFunctions";

export default {
  name: 'ColorSteps',
  mixins: [vueMixinColorFunctions],
  data() {
    return {
      color1: '#0B8E36',
      color2: '#000000',
      max: 27,
      min: 3,
      steps: 10
    }
  },
  computed: {
    colors() {
      const color1 = `${this.color1}000000`.substr(0, 7)
      const color2 = `${this.color2}000000`.substr(0, 7)
      return this.interpolateColors(color1, color2, this.steps);
    },
    visualSteps() {
      return this.steps - 2;
    },
    visualStepsLabel() {
      return this.visualSteps === 1 ? 'cor' : 'cores';
    }
  },
  methods: {
    adjust(color) {
      const hex = this.rgbToHex(color[0], color[1], color[2]);
      return this.foregroundAdjust(hex);
    },
    setStyles(color) {
      return `background: rgb(${color}); color: ${this.adjust(color)}`;
    },
    colorName(color) {
      return this.rgbArrayToHex(color);
    }
  }
}
</script>
<style>
:root {
  --white: #FFF;
  --black: #000;
}

.tools {
  flex: 1;
  padding: 2em;
  color: var(--white);
}

.tools div {
  display: flex;
  position: relative;
}

.tools div + div {
  margin-top: .5em;
}

.tools .steps {
  position: absolute;
  top: 50%;
  left: 6em;
  transform: translate(0, -50%);
  padding: 0;
  margin: 0;
}

.colors {
  flex: 2;
  display: flex;
  flex-direction: column;
  font-size: 26px;
}

.colors .color {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1em;
  transition: 300ms linear;
}

.vertical-range {
  align-items: center;
  width: 9em;
  height: 9em;
  transform: rotate(-90deg);
}

input {
  margin: 0;
  padding: 0 .5em;
  font-size: inherit;
  font-family: inherit;
  border: none;
  width: 7em;
  border-radius: 0 1em 1em 0;
}

input[type=color] {
  padding: 0;
  width: 2em;
  height: 2em;
  border-radius: 1em 0 0 1em;
}

input[type=color]::-webkit-color-swatch {
  border: none;
  border-radius: 1em;
}

input[type=color]::-webkit-color-swatch-wrapper {
  padding: .25em;
  border-radius: 1em;
}

input[type=range] {
  appearance: none;
  outline: none;
  display: inline-block;
  padding: 0;
  width: 100%;
  height: .25em;
  border-radius: 1em;
  cursor: pointer;
  background: var(--white);
}

input[type=range]::-webkit-slider-thumb {
  appearance: none;
  width: 1em;
  height: 1em;
  border-radius: 1em;
  box-shadow: 0 0 0 0.3em var(--black);
  background: var(--white);
  transition: transform .3s ease-out;
}

main {
  width: 100vw;
  display: flex;
  font-size: calc(1rem + 1vw);
}
</style>
