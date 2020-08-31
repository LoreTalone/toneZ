# Tonnetz

Tonnetz is a tonnetz diagram viewer built for browser in html5+css3+javascript using [p5.js](https://p5js.org/) for graphics and the [Tone.js](https://tonejs.github.io/) for sound.

The Tonnetz is a lattice diagram representing tonal space. It can be used to visualize harmonic relationships in music. Each node in the diagram corresponds to one of the 12 tones and is connected to 6 adjacent nodes. The 'neighbours' of each tone are related to it either by a third (major or minor) or by a perfect fifth, depending on their relative position in the diagram.
![screenshot](images/grid_screenshot_0.png)

See [Tonnetz][1], [Isochord][2] and [Neo-Remannian Theory][3] for more info.


## Getting Started

You just need to serve the main folder and then navigate to the ```index.html``` file to run the software.
If your browser supports the Web MIDI API, you can use Tonnetz with any MIDI-enabled instrument otherwise you can use your computer's keyboard to control the app.
Here the built-in keyboard mapping.
![screenshot](images/built_in_keyboard_mapping.png)

Through the options you can select the scale, the mode and also the voicing feature.
For the sound, there is an oscillator's type selector and a built-in ADSR for the envelope shape.


## Browser Compatibility

This project is compatible with a most common browser however, midi functionality is available just for few browsers (Chrome included).


## Built With

* HTML5 + CSS3 + Javascript
* [p5.js](https://p5js.org/)
* [Tone.js](https://tonejs.github.io/)


## Authors

* **Antonio Giganti** - [Antonio Giganti](https://github.com/antonelse)
* **Lorenzo Talone** - [Lorenzo Talone](https://github.com/LoreTalone)


## License

This project is licensed under the GNU General Public License v3 - see ```LICENSE.txt``` for details.

Tonnetz - browser tonnetz visualizator.
Copyright (C) 2020  Antonio Giganti & Lorenzo Talone


## Links

* [Videos](https://www.youtube.com/) - WIP
* [GitHub repository](https://github.com/) - WIP

[1]: https://en.wikipedia.org/wiki/Tonnetz "Wikipedia article about the Tonnetz"
[2]: https://www.researchgate.net/publication/221474662_Isochords_visualizing_structure_in_music "Conference Paper regarding the Tonnetz musical structure visualization"
[3]: https://en.wikipedia.org/wiki/Neo-Riemannian_theory "Wikipedia article about the underlying Tonnetz theory, the Neo-Remannian theory"
