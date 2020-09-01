function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function map(num, start_in, end_in, start_out, end_out) {
    return (num - start_in) * (end_out - start_out) / (end_in - start_in) + start_out;
}

function get_element_value_or_default(id, def) {
    if (document.getElementById(id).value)
        return document.getElementById(id).value;
    else return def;
}

var scale, image_scale, altitude_scale, temperature_scale, humidity_scale, weirdness_scale,
    altitude_offset, temperature_offset, humidity_offset, weirdness_offset,
    seed, biome_altitude_seed, biome_temperature_seed, biome_humidity_seed, biome_weirdness_seed,
    octaves;

function generate() {
    seed = parseInt(get_element_value_or_default(`seed_textbox`, 0));
    biome_altitude_seed = parseInt(get_element_value_or_default(`biome_altitude_seed_textbox`, 0));
    biome_temperature_seed = parseInt(get_element_value_or_default(`biome_temperature_seed_textbox`, 0));
    biome_humidity_seed = parseInt(get_element_value_or_default(`biome_humidity_seed_textbox`, 0));
    biome_weirdness_seed = parseInt(get_element_value_or_default(`biome_weirdness_seed_textbox`, 0));
    octaves = parseInt(get_element_value_or_default(`octaves_textbox`, 2));
    scale = parseFloat(get_element_value_or_default(`scale_textbox`, 10));
    image_scale = parseInt(get_element_value_or_default(`image_scale_textbox`, 2));
    temperature_scale = parseFloat(get_element_value_or_default(`temperature_scale_textbox`, 20));
    humidity_scale = parseFloat(get_element_value_or_default(`humidity_scale_textbox`, 20));
    altitude_scale = parseFloat(get_element_value_or_default(`altitude_scale_textbox`, 20));
    weirdness_scale = parseFloat(get_element_value_or_default(`weirdness_scale_textbox`, 20));
    temperature_offset = parseFloat(get_element_value_or_default(`temperature_offset_textbox`, -0.5));
    humidity_offset = parseFloat(get_element_value_or_default(`humidity_offset_textbox`, 0));
    altitude_offset = parseFloat(get_element_value_or_default(`altitude_offset_textbox`, 0));
    weirdness_offset = parseFloat(get_element_value_or_default(`weirdness_offset_textbox`, 0));

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

    var canvas = document.getElementById('canvas');
    var heightmap = [];
    var biomemap = [[]];

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        for (var x = 0; x < canvas.width / image_scale; x++) {
            for (var z = 0; z < canvas.height / image_scale; z++) {
                var h = x * canvas.height / image_scale + z;
                noise.seed(seed);
                if (!heightmap[h] || heightmap[h] == NaN)
                    heightmap[h] = noise.simplex2(x / 10 / scale, z / 10 / scale);

                for (var i = 1; i <= octaves; i++)
                    heightmap[h] += noise.simplex2(x / (2 * i) / scale + Math.pow(10, i + 3), z / (2 * i) / scale + Math.pow(10, i + 3));

                noise.seed(biome_altitude_seed);
                if (biomemap[h] == undefined || !biomemap[h][0] || biomemap[h] == NaN) {
                    biomemap[h] = [];
                    biomemap[h][0] = noise.simplex2(x / 10 / altitude_scale, z / 10 / altitude_scale);
                }

                for (var i = 1; i <= octaves; i++) {}
                    biomemap[h][0] += noise.simplex2(x / (2 * i) / altitude_scale + Math.pow(10, i + 3), z / (2 * i) / altitude_scale + Math.pow(10, i + 3));

                biomemap[h][0] += altitude_offset;

                noise.seed(biome_temperature_seed);
                if (biomemap[h] == undefined || !biomemap[h][1] || biomemap[h] == NaN)
                    biomemap[h][1] = noise.simplex2(x / 10 / temperature_scale, z / 10 / temperature_scale);

                for (var i = 1; i <= octaves; i++)
                    biomemap[h][1] += noise.simplex2(x / (2 * i) / temperature_scale + Math.pow(10, i + 3), z / (2 * i) / temperature_scale + Math.pow(10, i + 3));

                biomemap[h][1] += temperature_offset;

                noise.seed(biome_humidity_seed);
                if (biomemap[h] == undefined || !biomemap[h][2] || biomemap[h] == NaN)
                    biomemap[h][2] = noise.simplex2(x / 10 / humidity_scale, z / 10 / humidity_scale);

                for (var i = 1; i <= octaves; i++)
                    biomemap[h][2] += noise.simplex2(x / (2 * i) / humidity_scale + Math.pow(10, i + 3), z / (2 * i) / humidity_scale + Math.pow(10, i + 3));

                biomemap[h][2] += humidity_offset;

                noise.seed(biome_weirdness_seed);
                if (biomemap[h] == undefined || !biomemap[h][3] || biomemap[h] == NaN)
                    biomemap[h][3] = noise.simplex2(x / 100 / weirdness_scale, z / 100 / weirdness_scale);

                for (var i = 1; i <= octaves; i++)
                    biomemap[h][0] += noise.simplex2(x / (2 * i) / weirdness_scale + Math.pow(10, i + 3), z / (2 * i) / weirdness_scale + Math.pow(10, i + 3));

                biomemap[h][3] += weirdness_offset;
            }
        }

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
console.log(biomemap)
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