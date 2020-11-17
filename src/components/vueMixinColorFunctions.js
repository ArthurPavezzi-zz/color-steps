const vueMixinColorFunctions = {
    methods: {
        hexArray(hex) {
            return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        },
        rgbObjectFromHex(hex) {
            const result = this.hexArray(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            } : null;
        },
        rgbArrayFromHex(hex) {
            const rgb = this.rgbObjectFromHex(hex);
            return [rgb.r, rgb.g, rgb.b];
        },
        rgbChannelToHex(channel) {
            const hex = channel.toString(16)
            return hex.length === 1 ? `0${hex}` : hex
        },
        rgbToHex(r, g, b) {
            return `#${this.rgbChannelToHex(r)}${this.rgbChannelToHex(g)}${this.rgbChannelToHex(b)}`
        },
        rgbArrayToHex(color) {
            return this.rgbToHex(color[0], color[1], color[2])
        }, brightness(hex) {
            const rgb = this.rgbObjectFromHex(hex)
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
        },
        foregroundAdjust(hex, test, lightHex, darkHex) {
            test = test || 154
            lightHex = lightHex || '#fff'
            darkHex = darkHex || '#000'
            return this.brightness(hex) < test ? lightHex : darkHex
        },
        interpolateColor(color1, color2, factor) {
            if (arguments.length < 3) {
                factor = 0.5
            }
            const result = color1.slice()

            for (let i = 0; i < 3; i++) {
                result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]))
            }
            return result
        },
        interpolateColors(color1, color2, steps) {
            let stepFactor = 1 / (steps - 1)
            let interpolatedColorArray = []

            color1 = this.rgbArrayFromHex(color1).map(Number)
            color2 = this.rgbArrayFromHex(color2).map(Number)

            for (let i = 0; i < steps; i++) {
                interpolatedColorArray.push(this.interpolateColor(color1, color2, stepFactor * i))
            }

            return interpolatedColorArray
        }
    }
}

export default vueMixinColorFunctions