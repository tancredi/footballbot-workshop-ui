var fs = require('fs'),
    Q = require('q'),
    async = require('async'),
    child = require('child_process'),
    slug = require('slug');

var workshop = {
        load      : load,
        exercises : [],
        name: null
    };

function readToObject (obj, key, path) {
    return function (callback) {
        fs.exists(path, function (exists) {
            if (!exists) { return callback(); }

            fs.readFile(path, 'utf8', function (err, content) {
                if (err) { return callback(err); }
                obj[key] = content;
                callback();
            });
        });
    };
}

function isExercise (name) {
    return name.indexOf('.') === -1;
}

function load (name) {
    var deferred = Q.defer(),
        workshopDir = './node_modules/' + name,
        exercisesDir = workshopDir + '/problems';

    workshop.name = name;

    fs.readdir(exercisesDir, function (err, menu) {
        if (err) { throw err; }

        menu = menu.filter(isExercise);

        async.map(menu, function (name, callback) {
            var id = name,
                files = {};

            async.parallel([
                readToObject(files, 'problem', exercisesDir + '/' + id + '/problem.md'),
                readToObject(files, 'solution', exercisesDir + '/' + id + '/solution.js'),
            ], function (err) {
                callback(err, {
                    name: name,
                    id: id,
                    problem: files.problem,
                    solution: files.solution
                });
            });

        }, function (err, results) {
            if (err) { throw err; }

            workshop.exercises = results;
            deferred.resolve(workshop);
        });
    });

    return deferred.promise;
}

workshop.select = function (name) {
    var deferred = Q.defer();

    child.exec(workshop.name + ' select ' + name, function (err, stdout, stderr) {
        if (err || stderr) {
            return deferred.reject(err || new Error(stderr));
        }

        deferred.resolve();
    });

    return deferred.promise;
};

workshop.verify = function (exerciseName, scriptPath, callback) {
    workshop.select(exerciseName)
    .then(function () {
        var process = child.exec(workshop.name + ' verify ' + scriptPath);
        callback(null, process);
    }, function (err) {
        callback(err);
    });
};

module.exports = workshop;