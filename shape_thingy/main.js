var draw;

SVG.on(document, `DOMContentLoaded`, function() {
    draw = SVG().addTo(`#drawing`).size(500, 500)
})

var input = document.getElementById(`file`);
var timeline = new SVG.Timeline();

function start() {
    draw.clear();
    timeline.time(0);
    var file = document.getElementById(`file`).files[0];
    var reader = new FileReader();
    reader.readAsText(file, `UTF-8`);
    reader.onload = readerEvent => {
        var content = readerEvent.target.result;
        var json = JSON.parse(content);
        var shapes = [];
        var groups = json.groups;

        for (var i = 0; i < json.shape_count; i++) {
            var shape = json.shapes[`${i}`];
            for (var j = 0; j < shape.count; j++) {
                let element;
                switch (shape.type) {
                    case `circle`:
                        element = draw.circle(shape.radius)
                        break;

                    case `rect`:
                        element = draw.rect(shape.w, shape.h)
                        break;
                }

                if (shape.x != undefined)
                    element.x(shape.x)

                if (shape.y != undefined)
                    element.y(shape.y)

                if (shape.fill_opacity != undefined)
                    element.attr({
                        'fill-opacity': shape.fill_opacity
                    })

                if (shape.fill != undefined)
                    element.attr({
                        fill: shape.fill
                    })

                if (shape.radius != undefined)
                    element.size(shape.radius, shape.radius)

                if (shape.rotate != undefined)
                    element.rotate(shape.rotate)

                if (shape.skew != undefined)
                    element.skew(shape.skew.x, shape.skew.y)

                if (shape.scale != undefined)
                    element.scale(shape.scale)

                if (shape.flip != undefined)
                    element.flip(shape.flip)

                shapes.push(element
                    .timeline(timeline))
            }
        }

        for (var i = 0; i < json.animation_count; i++) {
            let anim = json.animations[`${i}`];
            let animation_settings = {
                duration: anim.duration,
                delay: anim.delay,
                swing: anim.swing,
                times: anim.times,
                wait: anim.wait,
                when: anim.when
            };

            let runner = shapes[`${anim.shape}`].animate(anim.duration, anim.delay, `absolute`);

            if (anim.x != undefined)
                runner.x(anim.x)

            if (anim.y != undefined)
                runner.y(anim.y)

            if (anim.cx != undefined)
                runner.cx(anim.cx)

            if (anim.cy != undefined)
                runner.cy(anim.cy)

            if (anim.dx != undefined)
                runner.dx(anim.dx)

            if (anim.dy != undefined)
                runner.dy(anim.dy)

            if (anim.w != undefined)
                runner.width(anim.w)

            if (anim.h != undefined)
                runner.height(anim.h)

            if (anim.fill_opacity != undefined)
                runner.attr({
                    'fill-opacity': anim.fill_opacity
                })

            if (anim.fill != undefined)
                runner.attr({
                    fill: anim.fill
                })

            if (anim.radius != undefined)
                runner.size(anim.radius, anim.radius)

            if (anim.rotate != undefined)
                runner.rotate(anim.rotate)

            if (anim.skew != undefined)
                runner.skew(anim.skew.x, anim.skew.y)

            if (anim.scale != undefined)
                runner.scale(anim.scale)

            if (anim.flip != undefined)
                runner.flip(anim.flip)
        }
    }
}