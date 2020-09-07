# AutoV

`Automatic insights extraction and visualization.`


## Introduction

AutoV helps you extract insights from data-source automatically and generate interactive visualization with interesting findings.

In this repo,
- `insights` is the core lib containing insight finding algorithm, auto specification, dashboard generator, etc.
- `frontend` is a demo build based on `insights`. frontend can be run individually without server. All the computation service are running in webworker by default.
- When you want to switch to server mode, you can run `backend` code.

Here are main parts in AutoV,

### DataSource
dataSource board is for data uploading, sampling(currently support stream data, which means there is no limit of the size of file you uploaded), cleaning and defining fields type(dimensions, measures). In visual insights, we regard dimensions as independent variable or feature and measures as dependent variable or target.

### Notebook
Notebook is a board for user to know what happened in the automatic analysis process and how rath uses visual-insights. It shows how decisions are made by the application and provide interactive interface to adjust some of the parameters and operators used by the algorithm. 

### Gallery
Gallery displays parts of the visualization with interesting findings. In Gallery, you can find interesting visualizaiton and use association feature to find more related visualization. You can also search specific info in gallery. There are some settings here to adjust some of the visual elements in the chart.

### Dashboard
automatic generate dashboard for you. rath will figure out a set of visualization of which contents are connected to each other and can be used to analysis a specific problem. 


## Quick start 

### run locally
(dev)
```bash
# under project root dir
yarn workspace insights build

yarn workspace frontend start

yarn workspace backend dev

# localhost:3000
```

production mode
```bash
yarn workspace insights build

yarn workspace frontend build

yarn workspace backend dev

# server:8000
```


## License

[GUN](./LICENSE)