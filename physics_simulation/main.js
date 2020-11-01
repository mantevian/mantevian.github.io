function get_element_value_or_default(id, def) {
    if (document.getElementById(id).value)
        return document.getElementById(id).value;
    else return def;
}

var canvas, ctx, ground_level, g, push_value, push_angle, timer, ticks, tickrate;

var object = {
    mass: 0,
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    acceleration: {
        x: 0,
        y: 0,
    },
    forces: [],
    on_ground: true
}

function start() {
    ticks = 0;
    object.position.x = 400;
    object.position.y = 100;
    object.velocity.x = 0;
    object.velocity.y = 0;
    object.acceleration.x = 0;
    object.acceleration.y = 0;
    object.forces = [];
    object.on_ground = false;
    object.mass = parseFloat(get_element_value_or_default(`ground_level_textbox`, 0.5));

    object.forces = [{
        name: "g",
        x: 0,
        y: g * object.mass,
        time: -1
    }];

    loop();
}

function loop() {
    ticks++;
    ground_level = parseInt(get_element_value_or_default(`ground_level_textbox`, 100));
    g = parseFloat(get_element_value_or_default(`g_textbox`, 1));
    push_value = parseFloat(get_element_value_or_default(`push_value_textbox`, -500));
    push_angle = parseFloat(get_element_value_or_default(`push_angle_textbox`, 180));
    object.mass = parseFloat(get_element_value_or_default(`ground_level_textbox`, 0.5));
    tickrate = parseInt(get_element_value_or_default(`tickrate_textbox`, 20));

    object.forces[0] = {
        name: "g",
        x: 0,
        y: g * object.mass,
        time: -1
    };

    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1000, 1000);

        if (object.position.y > canvas.height - ground_level) {
            object.on_ground = true;
            object.position.y = canvas.height - ground_level;
            object.acceleration.y = 0;
            object.velocity.y = 0;
        }

        var forces_count = object.forces.length;

        for (var i = 0; i < forces_count; i++) {
            if (object.forces[i] == null)
            continue;

            object.acceleration.x += object.forces[i].x;
            object.acceleration.y += object.forces[i].y;

            if (object.forces[i].time != -1)
                object.forces[i].time -= 1;
            if (object.forces[i].time == 0)
                object.forces[i] = null;
        }

        object.acceleration.x /= object.mass;
        object.acceleration.y /= object.mass;

        object.velocity.x += object.acceleration.x;
        object.velocity.y += object.acceleration.y;

        object.position.x += object.velocity.x;
        object.position.y += object.velocity.y;

        ctx.strokeStyle = `#ccc`;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - ground_level);
        ctx.lineTo(canvas.width, canvas.height - ground_level);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = `#fff`;
        ctx.beginPath();
        ctx.arc(object.position.x, object.position.y, 5, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        document.getElementById(`tick_count`).innerText = `Tick count: ${ticks}`;

        setTimeout(loop, tickrate);
    }
}

function push() {
    object.forces.push({
        name: "f",
        x: push_value * Math.cos(push_angle / 57.3),
        y: push_value * Math.sin(push_angle / 57.3),
        time: 1
    });
}