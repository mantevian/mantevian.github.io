function get_element_value_or_default(id, def) {
    if (document.getElementById(id).value)
        return document.getElementById(id).value;
    else return def;
}

var canvas, ctx, ground_level, g, push_value, push_angle, timer, ticks, tickrate, timeout;

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
    energy: {
        kinetic: 0,
        potential: 0
    },
    forces: [],
    on_ground: true
}

function start() {
    clearTimeout(timeout);
    ticks = 0;
    object = {
        mass: 0,
        position: {
            x: 4000,
            y: 1000
        },
        velocity: {
            x: 0,
            y: 0
        },
        acceleration: {
            x: 0,
            y: 0,
        },
        energy: {
            kinetic: 0,
            potential: 0
        },
        forces: [],
        on_ground: true
    }
    object.mass = parseFloat(get_element_value_or_default(`object_mass_textbox`, 2));

    loop();
}

function loop() {
    ticks++;
    ground_level = parseInt(get_element_value_or_default(`ground_level_textbox`, 100));
    g = parseFloat(get_element_value_or_default(`g_textbox`, 1));
    push_value = parseFloat(get_element_value_or_default(`push_value_textbox`, -500));
    push_angle = parseFloat(get_element_value_or_default(`push_angle_textbox`, 180));
    object.mass = parseFloat(get_element_value_or_default(`object_mass_textbox`, 2));
    tickrate = parseInt(get_element_value_or_default(`tickrate_textbox`, 20));

    console.log(`m ` + object.mass)
    console.log(`g ` + g * object.mass)
    apply_force(`g`, 0, g * object.mass, 1);

    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1000, 1000);

        object.energy.kinetic = object.mass * Math.sqrt(object.velocity.x * object.velocity.x + object.velocity.y * object.velocity.y) / 2;
        object.energy.potential = object.mass * g * (canvas.height - ground_level - object.position.y / 10);

        if (object.position.y / 10 > canvas.height - ground_level - 5)
            object.on_ground = true;
        else
            object.on_ground = false;

        if (object.on_ground) {
            object.position.y = (canvas.height - ground_level - 5) * 10;
            object.velocity.y = 0;
            apply_force(`n`, 0, -Math.sqrt(2 * g * object.acceleration.y), 1);
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
        ctx.arc(object.position.x / 10, object.position.y / 10, 5, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        document.getElementById(`tick_count`).innerText = `Tick count: ${ticks}`;

        timeout = setTimeout(loop, tickrate);

        if (object.forces[object.forces.length - 1] == null)
            object.forces.pop();
    }
}

function apply_force(name, x, y, time) {
    object.forces.push({
        name: name,
        x: x,
        y: y,
        time: time
    });
}

function apply_force_user() {
    object.forces.push({
        name: "f",
        x: push_value * Math.cos(push_angle / 57.3),
        y: push_value * Math.sin(push_angle / 57.3),
        time: 1
    });
}