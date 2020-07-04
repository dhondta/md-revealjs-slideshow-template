# Markdown Reveal.js Slideshow Template

This template allows to make a [Reveal.js](https://revealjs.com/) slideshow from a Markdown file with the [related plugin](https://revealjs.com/markdown/) using extensions relying on [Chart.js](https://www.chartjs.org/), [Flowchart.js](https://flowchart.js.org/), [JSMind](https://hizzgdev.github.io/jsmind/) and other Javascript plugins.

It still uses XMLHTTPRequests to get contents from the extensions and requires to disable the *Strict Origin Policy* for file URI's in the browser to work. In Firefox, this is done by setting `security.fileuri.strict_origin_policy` to `false` in the [`about:config`](about:config) page.

## Quickstart

Fork this repository and edit `slide.md`. In order to see the result, open `slidewhow.html` in your browser. Note that it will only work if the file URI strict origin policy is disabled. Otherwise, no content for the plugins will be loaded.

## Writing a slideshow with Markdown

In this template, the conventions are:

- `-----` (5 hyphens) is the separator between sections
- `----` (4 hyphens) is the separator for slides
- `---chart[...]---` is a marker for a chart ([Chart.js](https://www.chartjs.org/)) defined as a `.json` file in the `assets` folder ; if `---chart1---` is used, then it refers to `assets/chart1.json`
- `--flowchart[...]--` is a marker for a flowchart ([Flowchart.js](https://flowchart.js.org/)) defined as a `.diag` file in the `assets` folder ; if `--flowchart1--` is used, then it refers to `assets/flowchart1.diag`
- `--mindmap[...]--` is a marker for a mindmap ([JSMind](https://hizzgdev.github.io/jsmind/)) defined as a `.json` file in the `assets` folder ; if `---mindmap1---` is used, then it refers to `assets/mindmap1.json`
- `---quizz[...]---` is a marker for a quizz defined as a `.json` file in the `assets` folder ; if `---quizz1---` is used, then it refers to `assets/quizz1.json`

For the rest, it uses classical Markdown conventions and HTML can be used. In order to apply classes to generated HTML tags, the following syntax can be used:

- Do not display a title in the table of content: `<!-- .element: class="no-toc-progress" -->`
- Show/hide element after the initial display: `<!-- .element: class="fragment" -->`
- Apply custom style (e.g. defined in `css/customizations`) to an element: `<!-- .element: class="my-css-class" -->`

## Specific customizations

The layout of the slideshow can be customized by editing `css/customizations.css`.

Also, a few parameters can be tuned for some plugins:

- [Flowchart.js](https://flowchart.js.org/): `js/flowchart-options.js`
- [JSMind](https://hizzgdev.github.io/jsmind/): `js/jsmind-options.js`

## Using assets

As mentioned before, assets can be defined for use with the plugins. For each type of asset, please refer to the related official documentation:

- [Creating a chart with Chart.js](https://www.chartjs.org/docs/latest/getting-started/usage.html)
- [Describing a flowchart in dot notation with Flowchart.js](https://flowchart.js.org/#demo2)

For [JSMind](https://hizzgdev.github.io/jsmind/), the following example is self-explanatory:

```json
{
    "meta":{
        "name":"Mindmap",
        "author":"John Doe",
        "version":"1.0"
    },
    "format":"node_array",
    "data":[
        {"id":"root", "isroot":true, "topic":"Root node"},
        {"id":"sub1", "parentid":"root", "topic":"Branch 1", "expanded": false},
        {"id":"sub11", "parentid":"sub1", "topic":"Subbranch 1"},
        {"id":"sub2", "parentid":"root", "topic":"Branch 2"}
    ]
}
```

For the quizz plugin, the following example is self-explanatory:

```json
[{
    "question": "Question 1",
    "choices": [
        "Answer 1",
        "Answer 2",
        "Answer 3"
    ],
    "answer": 0
},{
    "question": "Question 2",
    "choices": [
        "True",
        "False"
    ],
    "answer": 1
}]
```

