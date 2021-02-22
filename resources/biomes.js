const biomes = [
    {
        "id": 0,
        "name": "plains",
        "color": "44ff44",
        "scale": 1,
        "height": 3,
        "altitude": 0.0,
        "temperature": 0.2,
        "humidity": 0.1,
        "weirdness": 0.0,
        "default_layer": "#3333cc",
        "layers": [
            {
                "color": "#4444ff",
                "height": -1
            },
            {
                "color": "#ccdd55",
                "height": -0.5
            },
            {
                "color": "#55dd55",
                "height": 0
            },
            {
                "color": "#33e933",
                "height": 2
            },
            {
                "color": "#44ff44",
                "height": 4
            }
        ]
    },
    {
        "id": 1,
        "name": "forest",
        "color": "44ff44",
        "scale": 1,
        "height": 4,
        "altitude": 0.1,
        "temperature": 0.1,
        "humidity": 0.4,
        "weirdness": 0.0,
        "default_layer": "#3333cc",
        "layers": [
            {
                "color": "#4444ff",
                "height": -1
            },
            {
                "color": "#ccdd55",
                "height": -0.5
            },
            {
                "color": "#33bb33",
                "height": 0
            },
            {
                "color": "#22cc22",
                "height": 2
            },
            {
                "color": "#22dd22",
                "height": 4
            }
        ]
    },
    {
        "id": 2,
        "name": "dark_forest",
        "color": "44ff44",
        "scale": 1,
        "height": 6,
        "altitude": 0.2,
        "temperature": 0.2,
        "humidity": 0.6,
        "weirdness": 0.2,
        "default_layer": "#3333cc",
        "layers": [
            {
                "color": "#4444ff",
                "height": -1
            },
            {
                "color": "#ccdd55",
                "height": -0.5
            },
            {
                "color": "#339933",
                "height": 0
            },
            {
                "color": "#22aa22",
                "height": 2
            },
            {
                "color": "#22bb22",
                "height": 4
            }
        ]
    },
    {
        "id": 3,
        "name": "jungle",
        "color": "77ff44",
        "scale": 1,
        "height": 6,
        "altitude": 0.2,
        "temperature": 0.6,
        "humidity": 1.0,
        "weirdness": 0.0,
        "default_layer": "#3333cc",
        "layers": [
            {
                "color": "#4444ff",
                "height": -1
            },
            {
                "color": "#ccdd55",
                "height": -0.5
            },
            {
                "color": "#99aa33",
                "height": 0
            },
            {
                "color": "#aadd22",
                "height": 2
            },
            {
                "color": "#ccff22",
                "height": 4
            }
        ]
    },
    {
        "id": 10,
        "name": "desert",
        "color": "ffff33",
        "scale": 1,
        "height": 3,
        "altitude": 0.3,
        "temperature": 1.2,
        "humidity": -0.2,
        "weirdness": 0.0,
        "default_layer": "#3333cc",
        "layers": [
            {
                "color": "#4444ff",
                "height": -1
            },
            {
                "color": "#dddd55",
                "height": 0
            },
            {
                "color": "#eeee44",
                "height": 2
            },
            {
                "color": "#ffff33",
                "height": 4
            }
        ]
    },
    {
        "id": 20,
        "name": "mountains",
        "color": "ffff33",
        "scale": 1,
        "height": 10,
        "altitude": 1.6,
        "temperature": 0.2,
        "humidity": 0.1,
        "weirdness": 0.0,
        "default_layer": "#3333cc",
        "layers": [
            {
                "color": "#4444ff",
                "height": -1
            },
            {
                "color": "#55ff55",
                "height": 9
            },
            {
                "color": "#cccccc",
                "height": 9.5
            },
            {
                "color": "#dddddd",
                "height": 10.5
            }
        ]
    },
    {
        "id": 30,
        "name": "taiga",
        "color": "ffff33",
        "scale": 1,
        "height": 5,
        "altitude": 0.3,
        "temperature": -0.6,
        "humidity": 0.3,
        "weirdness": 0.0,
        "default_layer": "#3333cc",
        "layers": [
            {
                "color": "#4444ff",
                "height": -1
            },
            {
                "color": "#99ff66",
                "height": 2
            },
            {
                "color": "#ddffdd",
                "height": 3
            },
            {
                "color": "#ffffff",
                "height": 4
            }
        ]
    },
    {
        "id": 11,
        "name": "mesa",
        "color": "ff9922",
        "scale": 1,
        "height": 6,
        "altitude": 0.6,
        "temperature": 1.0,
        "humidity": -0.8,
        "weirdness": 0.9,
        "default_layer": "#3333cc",
        "layers": [
            {
                "color": "#4444ff",
                "height": -1
            },
            {
                "color": "#dd7744",
                "height": 0
            },
            {
                "color": "#ee8833",
                "height": 3
            },
            {
                "color": "#ff9922",
                "height": 5
            }
        ]
    },
    {
        "id": 31,
        "name": "ice",
        "color": "ffff33",
        "scale": 1,
        "height": 7,
        "altitude": 0.4,
        "temperature": -0.6,
        "humidity": 0.4,
        "weirdness": 0.8,
        "default_layer": "#3333cc",
        "layers": [
            {
                "color": "#4444ff",
                "height": -1
            },
            {
                "color": "#6688dd",
                "height": 2
            },
            {
                "color": "99bbdd",
                "height": 3.5
            },
            {
                "color": "#bbbbff",
                "height": 5
            }
        ]
    },
    {
        "id": 40,
        "name": "ocean",
        "color": "#3333ff",
        "scale": 1,
        "height": -6,
        "altitude": -0.8,
        "temperature": 0.0,
        "humidity": 0.0,
        "weirdness": 0.0,
        "default_layer": "#2222aa",
        "layers": [
            {
                "color": "#3333cc",
                "height": -3
            },
            {
                "color": "#3333ff",
                "height": 0.5
            },
            {
                "color": "#ffff33",
                "height": 1
            }
        ]
    },
    {
        "id": 41,
        "name": "deep_ocean",
        "color": "#3333ff",
        "scale": 1,
        "height": -9,
        "altitude": -1.5,
        "temperature": 0.0,
        "humidity": 0.0,
        "weirdness": 0.0,
        "default_layer": "#2222aa",
        "layers": [
            {
                "color": "#333399",
                "height": -3
            },
            {
                "color": "#3333bb",
                "height": 0
            }
        ]
    },
    {
        "id": 42,
        "name": "cold_ocean",
        "color": "#8888ff",
        "scale": 1,
        "height": -6,
        "altitude": -0.8,
        "temperature": -0.4,
        "humidity": 0.4,
        "weirdness": 0.0,
        "default_layer": "#4444aa",
        "layers": [
            {
                "color": "#6666cc",
                "height": -3
            },
            {
                "color": "#8888ff",
                "height": 0.5
            },
            {
                "color": "#aaaaff",
                "height": 1
            }
        ]
    },
    {
        "id": 43,
        "name": "frozen_ocean",
        "color": "#8888ff",
        "scale": 1,
        "height": -8,
        "altitude": -0.9,
        "temperature": -0.8,
        "humidity": 0.4,
        "weirdness": 0.0,
        "default_layer": "#4444aa",
        "layers": [
            {
                "color": "#6666cc",
                "height": -3
            },
            {
                "color": "#ccccff",
                "height": 0
            }
        ]
    },
    {
        "id": 44,
        "name": "warm_ocean",
        "color": "#2244ff",
        "scale": 1,
        "height": -5,
        "altitude": -0.8,
        "temperature": 0.4,
        "humidity": 0.4,
        "weirdness": 0.0,
        "default_layer": "#2244aa",
        "layers": [
            {
                "color": "#3355cc",
                "height": -3
            },
            {
                "color": "#3355ff",
                "height": 0.5
            },
            {
                "color": "#ccff33",
                "height": 1
            }
        ]
    },
    {
        "id": 45,
        "name": "deep_warm_ocean",
        "color": "#2244ff",
        "scale": 1,
        "height": -8,
        "altitude": -1.2,
        "temperature": 0.4,
        "humidity": 0.4,
        "weirdness": 0.0,
        "default_layer": "#2244aa",
        "layers": [
            {
                "color": "#3355bb",
                "height": -3
            },
            {
                "color": "#3377cc",
                "height": 0.5
            },
            {
                "color": "#ccff33",
                "height": 1
            }
        ]
    }
]
