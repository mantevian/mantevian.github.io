function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function map(num, start_in, end_in, start_out, end_out) {
    return (num - start_in) * (end_out - start_out) / (end_in - start_in) + start_out
}

const biomes = [
    {
        id: 0,
        name: "plains",
        color: "44ff44",
        scale: 1,
        altitude: 3,
        height: 0.5,
        temperature: 0.5,
        weirdness: 0.0,
        default_layer: "#3333cc",
        layers: [
            {
                color: "#4444ff",
                height: -1
            },
            {
                color: "#ccdd55",
                height: -0.5
            },
            {
                color: "#55dd55",
                height: 0
            },
            {
                color: "#33e933",
                height: 2
            },
            {
                color: "#44ff44",
                height: 4
            },
        ]
    },
    {
        id: 1,
        name: "forest",
        color: "44ff44",
        scale: 1,
        altitude: 4,
        height: 0.8,
        temperature: 0.4,
        weirdness: 0.1,
        default_layer: "#3333cc",
        layers: [
            {
                color: "#4444ff",
                height: -1
            },
            {
                color: "#ccdd55",
                height: -0.5
            },
            {
                color: "#33bb33",
                height: 0
            },
            {
                color: "#22cc22",
                height: 2
            },
            {
                color: "#22dd22",
                height: 4
            }
        ]
    },
    {
        id: 2,
        name: "dark_forest",
        color: "44ff44",
        scale: 1,
        altitude: 6,
        height: 0.9,
        temperature: 0.5,
        weirdness: 0.4,
        default_layer: "#3333cc",
        layers: [
            {
                color: "#4444ff",
                height: -1
            },
            {
                color: "#ccdd55",
                height: -0.5
            },
            {
                color: "#339933",
                height: 0
            },
            {
                color: "#22aa22",
                height: 2
            },
            {
                color: "#22bb22",
                height: 4
            }
        ]
    },
    {
        id: 3,
        name: "desert",
        color: "ffff33",
        scale: 1,
        altitude: 3,
        height: 0.5,
        temperature: 1.0,
        weirdness: 0.0,
        default_layer: "#3333cc",
        layers: [
            {
                color: "#4444ff",
                height: -1
            },
            {
                color: "#dddd55",
                height: 0
            },
            {
                color: "#eeee44",
                height: 2
            },
            {
                color: "#ffff33",
                height: 4
            },
        ]
    },
    {
        id: 4,
        name: "mountains",
        color: "ffff33",
        scale: 1,
        altitude: 10,
        height: 2.5,
        temperature: -0.1,
        weirdness: 0.0,
        default_layer: "#3333cc",
        layers: [
            {
                color: "#4444ff",
                height: -1
            },
            {
                color: "#55ff55",
                height: 9
            },
            {
                color: "#cccccc",
                height: 9.5
            },
            {
                color: "#dddddd",
                height: 10.5
            },
        ]
    },
    {
        id: 5,
        name: "taiga",
        color: "ffff33",
        scale: 1,
        altitude: 5,
        height: 0.5,
        temperature: -0.9,
        weirdness: 0.0,
        default_layer: "#3333cc",
        layers: [
            {
                color: "#4444ff",
                height: -1
            },
            {
                color: "#99ff66",
                height: 2
            },
            {
                color: "#ddffdd",
                height: 3
            },
            {
                color: "#ffffff",
                height: 4
            },
        ]
    },
    {
        id: 6,
        name: "mesa",
        color: "ff9922",
        scale: 1,
        altitude: 6,
        height: 0.6,
        temperature: 2.0,
        weirdness: 1.0,
        default_layer: "#3333cc",
        layers: [
            {
                color: "#4444ff",
                height: -1
            },
            {
                color: "#dd7744",
                height: 0
            },
            {
                color: "#ee8833",
                height: 3
            },
            {
                color: "#ff9922",
                height: 5
            },
        ]
    },
    {
        id: 7,
        name: "ice",
        color: "ffff33",
        scale: 1,
        altitude: 7,
        height: 0.5,
        temperature: -1.1,
        weirdness: 0.5,
        default_layer: "#3333cc",
        layers: [
            {
                color: "#4444ff",
                height: -1
            },
            {
                color: "#6688dd",
                height: 2
            },
            {
                color: "99bbdd",
                height: 3.5
            },
            {
                color: "#bbbbff",
                height: 5
            },
        ]
    },
    {
        id: 8,
        name: "ocean",
        color: "#3333ff",
        scale: 1,
        altitude: -6,
        height: -0.5,
        temperature: 0.1,
        weirdness: 0.0,
        default_layer: "#2222aa",
        layers: [
            {
                color: "#3333cc",
                height: -3
            },
            {
                color: "#3333ff",
                height: 0.5
            },
            {
                color: "#ffff33",
                height: 1
            }
        ]
    },
    {
        id: 9,
        name: "cold_ocean",
        color: "#8888ff",
        scale: 1,
        altitude: -7,
        height: -1,
        temperature: -0.5,
        weirdness: 0.0,
        default_layer: "#4444aa",
        layers: [
            {
                color: "#6666cc",
                height: -3
            },
            {
                color: "#8888ff",
                height: 0.5
            },
            {
                color: "#aaaaff",
                height: 1
            }
        ]
    },
    {
        id: 10,
        name: "warm_ocean",
        color: "#2244ff",
        scale: 1,
        altitude: -5,
        height: -0.5,
        temperature: 0.9,
        weirdness: 0.0,
        default_layer: "#2244aa",
        layers: [
            {
                color: "#3355cc",
                height: -3
            },
            {
                color: "#3355ff",
                height: 0.5
            },
            {
                color: "#ccff33",
                height: 1
            }
        ]
    }
]

function draw() {
    var canvas = document.getElementById('canvas');
    const scale = 10;
    const image_scale = 1;
    const temperature_scale = 30;
    const height_scale = 20;
    const weirdness_scale = 50;
    var heightmap = [];
    var biomemap = [[]];
    var biomelist = {};
    const seed = Math.random() * 65536 % 65536;
    const biome_height_seed = Math.random() * 65536 % 65536;
    const biome_temperature_seed = Math.random() * 65536 % 65536;
    const biome_weirdness_seed = Math.random() * 65536 % 65536;
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        for (var x = 0; x < canvas.width / image_scale; x++) {
            for (var z = 0; z < canvas.height / image_scale; z++) {
                var h = x * canvas.height / image_scale + z;
                noise.seed(seed);
                if (!heightmap[h] || heightmap[h] == NaN)
                    heightmap[h] = noise.simplex2(x / 10 / scale, z / 10 / scale);
                heightmap[h] += noise.simplex2(x / 8 / scale + 1000, z / 8 / scale + 1000);
                heightmap[h] += noise.simplex2(x / 6 / scale + 10000, z / 6 / scale + 10000);
                heightmap[h] += noise.simplex2(x / 4 / scale + 100000, z / 4 / scale + 100000);
                heightmap[h] += noise.simplex2(x / 2 / scale + 1000000, z / 2 / scale + 1000000);

                noise.seed(biome_height_seed)
                if (biomemap[h] == undefined || !biomemap[h][0] || biomemap[h] == NaN) {
                    biomemap[h] = [];
                    biomemap[h][0] = noise.simplex2(x / 10 / height_scale, z / 10 / height_scale);
                }

                biomemap[h][0] += noise.simplex2(x / 8 / height_scale + 1000, z / 8 / height_scale + 1000);
                biomemap[h][0] += noise.simplex2(x / 6 / height_scale + 10000, z / 6 / height_scale + 10000);
                biomemap[h][0] += noise.simplex2(x / 4 / height_scale + 100000, z / 4 / height_scale + 100000);
                biomemap[h][0] += noise.simplex2(x / 2 / height_scale + 1000000, z / 2 / height_scale + 1000000);

                noise.seed(biome_temperature_seed)
                if (biomemap[h] == undefined || !biomemap[h][1] || biomemap[h] == NaN)
                    biomemap[h][1] = noise.simplex2(x / 10 / temperature_scale, z / 10 / temperature_scale);
                biomemap[h][1] += noise.simplex2(x / 8 / temperature_scale + 1000, z / 8 / temperature_scale + 1000);
                biomemap[h][1] += noise.simplex2(x / 6 / temperature_scale + 10000, z / 6 / temperature_scale + 10000);
                biomemap[h][1] += noise.simplex2(x / 4 / temperature_scale + 100000, z / 4 / temperature_scale + 100000);
                biomemap[h][1] += noise.simplex2(x / 2 / temperature_scale + 1000000, z / 2 / temperature_scale + 1000000);

                noise.seed(biome_weirdness_seed)
                if (biomemap[h] == undefined || !biomemap[h][2] || biomemap[h] == NaN)
                    biomemap[h][2] = noise.simplex2(x / 100 / weirdness_scale, z / 100 / weirdness_scale);
                biomemap[h][2] += noise.simplex2(x / 80 / weirdness_scale + 1000, z / 80 / weirdness_scale + 1000);
                biomemap[h][2] += noise.simplex2(x / 60 / weirdness_scale + 10000, z / 60 / weirdness_scale + 10000);
                biomemap[h][2] += noise.simplex2(x / 40 / weirdness_scale + 100000, z / 40 / weirdness_scale + 100000);
                biomemap[h][2] += noise.simplex2(x / 20 / weirdness_scale + 1000000, z / 20 / weirdness_scale + 1000000);
            }
        }

        console.log(biomemap)

        var biomeidmap = [];
        for (var i = 0; i < biomemap.length; i++) {
            var height_difference = 0;
            var min_height_difference = 65535;
            var temperature_difference = 0;
            var min_temperature_difference = 65535;
            var weirdness_difference = 0;
            var min_weirdness_difference = 65535;

            for (var b = 0; b < biomes.length; b++) {
                height_difference = Math.abs(biomemap[i][0] - biomes[b].height);
                temperature_difference = Math.abs(biomemap[i][1] - biomes[b].temperature);
                weirdness_difference = Math.abs(biomemap[i][2] - biomes[b].weirdness);

                if (temperature_difference + height_difference + weirdness_difference < min_temperature_difference + min_height_difference + min_weirdness_difference)
                    biomeidmap[i] = biomes[b].id;

                if (height_difference < min_height_difference)
                    min_height_difference = height_difference;

                if (temperature_difference < min_temperature_difference)
                    min_temperature_difference = temperature_difference;

                if (weirdness_difference < min_weirdness_difference)
                    min_weirdness_difference = weirdness_difference;
            }
        }

        console.log(biomeidmap)

        for (var i = 0; i < heightmap.length; i++) {
            var biome = biomes.find(b => b.id == biomeidmap[i]);

            heightmap[i] += biome.altitude;

            var x = Math.floor(i / (canvas.height / image_scale));
            var z = Math.floor(i % (canvas.height / image_scale));

            var color = biome.default_layer;

            for (var l = 0; l < biome.layers.length; l++)
                if (heightmap[i] > biome.layers[l].height)
                    color = biome.layers[l].color;

            ctx.fillStyle = color;
            ctx.fillRect(x * image_scale, z * image_scale, image_scale, image_scale);
        }

        console.log(JSON.stringify(biomelist))
    }
}