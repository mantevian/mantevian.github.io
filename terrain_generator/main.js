function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function map(num, start_in, end_in, start_out, end_out) {
    return (num - start_in) * (end_out - start_out) / (end_in - start_in) + start_out;
}

var scale = 10;
var image_scale = 10;
var temperature_scale = 30;
var altitude_scale = 20;
var humidity_scale = 20;
var weirdness_scale = 50;

var temperature_offset = 0;
var altitude_offset = 0;
var humidity_offset = 0;
var weirdness_offset = 0;

var seed = Math.random() * 65536 % 65536;
var biome_altitude_seed = Math.random() * 65536 % 65536;
var biome_temperature_seed = Math.random() * 65536 % 65536;
var biome_humidity_seed = Math.random() * 65536 % 65536;
var biome_weirdness_seed = Math.random() * 65536 % 65536;

function generate() {
    seed = document.getElementById(`seed_textbox`).value;
    biome_altitude_seed = document.getElementById(`biome_altitude_seed_textbox`).value;
    biome_temperature_seed = document.getElementById(`biome_temperature_seed_textbox`).value;
    biome_humidity_seed = document.getElementById(`biome_humidity_seed_textbox`).value;
    biome_weirdness_seed = document.getElementById(`biome_weirdness_seed_textbox`).value;

    if (seed == 0)
        seed = Math.random() * 65536 % 65536;

    if (biome_altitude_seed == 0)
        biome_altitude_seed = Math.random() * 65536 % 65536;

    if (biome_temperature_seed == 0)
        biome_temperature_seed = Math.random() * 65536 % 65536;

    if (biome_humidity_seed == 0)
        biome_humidity_seed = Math.random() * 65536 % 65536;

    if (biome_weirdness_seed == 0)
        biome_weirdness_seed = Math.random() * 65536 % 65536;

    scale = document.getElementById(`scale_textbox`).value;
    image_scale = document.getElementById(`image_scale_textbox`).value;
    temperature_scale = document.getElementById(`temperature_scale_textbox`).value;
    humidity_scale = document.getElementById(`humidity_scale_textbox`).value;
    altitude_scale = document.getElementById(`altitude_scale_textbox`).value;
    weirdness_scale = document.getElementById(`weirdness_scale_textbox`).value;

    temperature_offset = document.getElementById(`temperature_offset_textbox`).value;
    humidity_offset = document.getElementById(`humidity_offset_textbox`).value;
    altitude_offset = document.getElementById(`altitude_offset_textbox`).value;
    weirdness_offset = document.getElementById(`weirdness_offset_textbox`).value;

    var canvas = document.getElementById('canvas');
    var heightmap = [];
    var biomemap = [[]];
    var biomelist = {};

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

                noise.seed(biome_altitude_seed)
                if (biomemap[h] == undefined || !biomemap[h][0] || biomemap[h] == NaN) {
                    biomemap[h] = [];
                    biomemap[h][0] = noise.simplex2(x / 10 / altitude_scale, z / 10 / altitude_scale);
                }

                biomemap[h][0] += noise.simplex2(x / 8 / altitude_scale + 1000, z / 8 / altitude_scale + 1000);
                biomemap[h][0] += noise.simplex2(x / 6 / altitude_scale + 10000, z / 6 / altitude_scale + 10000);
                biomemap[h][0] += noise.simplex2(x / 4 / altitude_scale + 100000, z / 4 / altitude_scale + 100000);
                biomemap[h][0] += noise.simplex2(x / 2 / altitude_scale + 1000000, z / 2 / altitude_scale + 1000000);

                biomemap[h][0] += parseFloat(altitude_offset);

                noise.seed(biome_temperature_seed)
                if (biomemap[h] == undefined || !biomemap[h][1] || biomemap[h] == NaN)
                    biomemap[h][1] = noise.simplex2(x / 10 / temperature_scale, z / 10 / temperature_scale);
                biomemap[h][1] += noise.simplex2(x / 8 / temperature_scale + 1000, z / 8 / temperature_scale + 1000);
                biomemap[h][1] += noise.simplex2(x / 6 / temperature_scale + 10000, z / 6 / temperature_scale + 10000);
                biomemap[h][1] += noise.simplex2(x / 4 / temperature_scale + 100000, z / 4 / temperature_scale + 100000);
                biomemap[h][1] += noise.simplex2(x / 2 / temperature_scale + 1000000, z / 2 / temperature_scale + 1000000);

                biomemap[h][1] += parseFloat(temperature_offset);

                noise.seed(biome_humidity_seed)
                if (biomemap[h] == undefined || !biomemap[h][2] || biomemap[h] == NaN)
                    biomemap[h][2] = noise.simplex2(x / 10 / humidity_scale, z / 10 / humidity_scale);
                biomemap[h][2] += noise.simplex2(x / 8 / humidity_scale + 1000, z / 8 / humidity_scale + 1000);
                biomemap[h][2] += noise.simplex2(x / 6 / humidity_scale + 10000, z / 6 / humidity_scale + 10000);
                biomemap[h][2] += noise.simplex2(x / 4 / humidity_scale + 100000, z / 4 / humidity_scale + 100000);
                biomemap[h][2] += noise.simplex2(x / 2 / humidity_scale + 1000000, z / 2 / humidity_scale + 1000000);

                biomemap[h][2] += parseFloat(humidity_offset);

                noise.seed(biome_weirdness_seed)
                if (biomemap[h] == undefined || !biomemap[h][3] || biomemap[h] == NaN)
                    biomemap[h][3] = noise.simplex2(x / 100 / weirdness_scale, z / 100 / weirdness_scale);
                biomemap[h][3] += noise.simplex2(x / 80 / weirdness_scale + 1000, z / 80 / weirdness_scale + 1000);
                biomemap[h][3] += noise.simplex2(x / 60 / weirdness_scale + 10000, z / 60 / weirdness_scale + 10000);
                biomemap[h][3] += noise.simplex2(x / 40 / weirdness_scale + 100000, z / 40 / weirdness_scale + 100000);
                biomemap[h][3] += noise.simplex2(x / 20 / weirdness_scale + 1000000, z / 20 / weirdness_scale + 1000000);

                biomemap[h][3] += parseFloat(weirdness_offset);
            }
        }

        console.log(biomemap)

        var biomeidmap = [];
        for (var i = 0; i < biomemap.length; i++) {
            var altitude_difference = 0;
            var min_altitude_difference = 65535;
            var temperature_difference = 0;
            var min_temperature_difference = 65535;
            var humidity_difference = 0;
            var min_humidity_difference = 65535;
            var weirdness_difference = 0;
            var min_weirdness_difference = 65535;

            for (var b = 0; b < biomes.length; b++) {
                altitude_difference = Math.abs(biomemap[i][0] - biomes[b].altitude);
                temperature_difference = Math.abs(biomemap[i][1] - biomes[b].temperature);
                humidity_difference = Math.abs(biomemap[i][2] - biomes[b].humidity);
                weirdness_difference = Math.abs(biomemap[i][3] - biomes[b].weirdness);

                if (temperature_difference + altitude_difference + humidity_difference + weirdness_difference < min_temperature_difference + min_humidity_difference + min_altitude_difference + min_weirdness_difference)
                    biomeidmap[i] = biomes[b].id;

                if (altitude_difference < min_altitude_difference)
                    min_altitude_difference = altitude_difference;

                if (temperature_difference < min_temperature_difference)
                    min_temperature_difference = temperature_difference;

                if (humidity_difference < min_humidity_difference)
                    min_humidity_difference = humidity_difference;

                if (weirdness_difference < min_weirdness_difference)
                    min_weirdness_difference = weirdness_difference;

            }
        }

        for (var i = 0; i < heightmap.length; i++) {
            var biome = biomes.find(b => b.id == biomeidmap[i]);

            heightmap[i] += biome.height;

            var x = Math.floor(i / (canvas.height / image_scale));
            var z = Math.floor(i % (canvas.height / image_scale));

            var color = biome.default_layer;

            for (var l = 0; l < biome.layers.length; l++)
                if (heightmap[i] > biome.layers[l].height)
                    color = biome.layers[l].color;

            ctx.fillStyle = color;
            ctx.fillRect(x * image_scale, z * image_scale, image_scale, image_scale);
        }
    }
}