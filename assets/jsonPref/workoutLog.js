const workoutLog = [
    // PUSH DAY
    {
        date: '2026-02-01',
        splitDay: 'Push',
        exercises: [
            // Chest
            {
                name: 'Barbell Bench Press',
                muscleGroup: 'Chest',
                sets: 4,
                reps: 8,
                weight: 185
            },
            {
                name: 'Incline Dumbbell Press',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 10,
                weight: 70
            },
            {
                name: 'Cable Flyes',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 12,
                weight: 30
            },
            // Shoulders
            {
                name: 'Overhead Press',
                muscleGroup: 'Shoulders',
                sets: 4,
                reps: 8,
                weight: 115
            },
            {
                name: 'Lateral Raises',
                muscleGroup: 'Shoulders',
                sets: 3,
                reps: 12,
                weight: 20
            },
            // Triceps
            {
                name: 'Tricep Dips',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 10,
                weight: 0
            },
            {
                name: 'Overhead Tricep Extension',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 12,
                weight: 50
            }
        ]
    },
    
    // PULL DAY
    {
        date: '2026-02-03',
        splitDay: 'Pull',
        exercises: [
            // Back
            {
                name: 'Deadlift',
                muscleGroup: 'Back',
                sets: 4,
                reps: 6,
                weight: 275
            },
            {
                name: 'Pull Ups',
                muscleGroup: 'Back',
                sets: 4,
                reps: 8,
                weight: 0
            },
            {
                name: 'Barbell Rows',
                muscleGroup: 'Back',
                sets: 4,
                reps: 8,
                weight: 155
            },
            {
                name: 'Lat Pulldown',
                muscleGroup: 'Back',
                sets: 3,
                reps: 10,
                weight: 140
            },
            {
                name: 'Face Pulls',
                muscleGroup: 'Back',
                sets: 3,
                reps: 15,
                weight: 40
            },
            // Biceps
            {
                name: 'Barbell Curl',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 10,
                weight: 70
            },
            {
                name: 'Hammer Curls',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 12,
                weight: 35
            }
        ]
    },
    
    // LEGS DAY
    {
        date: '2026-02-05',
        splitDay: 'Legs',
        exercises: [
            // Quads
            {
                name: 'Barbell Squat',
                muscleGroup: 'Quads',
                sets: 4,
                reps: 8,
                weight: 225
            },
            {
                name: 'Leg Press',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 10,
                weight: 360
            },
            {
                name: 'Leg Extension',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 12,
                weight: 120
            },
            // Hamstrings
            {
                name: 'Romanian Deadlift',
                muscleGroup: 'Hamstrings',
                sets: 4,
                reps: 8,
                weight: 185
            },
            {
                name: 'Leg Curl',
                muscleGroup: 'Hamstrings',
                sets: 3,
                reps: 12,
                weight: 90
            },
            // Glutes
            {
                name: 'Hip Thrust',
                muscleGroup: 'Glutes',
                sets: 3,
                reps: 10,
                weight: 205
            },
            // Calves
            {
                name: 'Calf Raises',
                muscleGroup: 'Calves',
                sets: 4,
                reps: 15,
                weight: 180
            }
        ]
    },

    // PUSH DAY 2
    {
        date: '2026-02-07',
        splitDay: 'Push',
        exercises: [
            // Chest
            {
                name: 'Barbell Bench Press',
                muscleGroup: 'Chest',
                sets: 4,
                reps: 8,
                weight: 190
            },
            {
                name: 'Incline Dumbbell Press',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 10,
                weight: 75
            },
            {
                name: 'Cable Flyes',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 12,
                weight: 32.5
            },
            // Shoulders
            {
                name: 'Overhead Press',
                muscleGroup: 'Shoulders',
                sets: 4,
                reps: 8,
                weight: 120
            },
            {
                name: 'Lateral Raises',
                muscleGroup: 'Shoulders',
                sets: 3,
                reps: 12,
                weight: 22.5
            },
            // Triceps
            {
                name: 'Tricep Dips',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 10,
                weight: 0
            },
            {
                name: 'Overhead Tricep Extension',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 12,
                weight: 55
            }
        ]
    },

    // PULL DAY 2
    {
        date: '2026-02-09',
        splitDay: 'Pull',
        exercises: [
            // Back
            {
                name: 'Deadlift',
                muscleGroup: 'Back',
                sets: 4,
                reps: 6,
                weight: 285
            },
            {
                name: 'Pull Ups',
                muscleGroup: 'Back',
                sets: 4,
                reps: 9,
                weight: 0
            },
            {
                name: 'Barbell Rows',
                muscleGroup: 'Back',
                sets: 4,
                reps: 8,
                weight: 160
            },
            {
                name: 'Lat Pulldown',
                muscleGroup: 'Back',
                sets: 3,
                reps: 10,
                weight: 145
            },
            {
                name: 'Face Pulls',
                muscleGroup: 'Back',
                sets: 3,
                reps: 15,
                weight: 42.5
            },
            // Biceps
            {
                name: 'Barbell Curl',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 10,
                weight: 75
            },
            {
                name: 'Hammer Curls',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 12,
                weight: 37.5
            }
        ]
    },

    // LEGS DAY 2
    {
        date: '2026-02-11',
        splitDay: 'Legs',
        exercises: [
            // Quads
            {
                name: 'Barbell Squat',
                muscleGroup: 'Quads',
                sets: 4,
                reps: 8,
                weight: 235
            },
            {
                name: 'Leg Press',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 10,
                weight: 380
            },
            {
                name: 'Leg Extension',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 12,
                weight: 125
            },
            // Hamstrings
            {
                name: 'Romanian Deadlift',
                muscleGroup: 'Hamstrings',
                sets: 4,
                reps: 8,
                weight: 195
            },
            {
                name: 'Leg Curl',
                muscleGroup: 'Hamstrings',
                sets: 3,
                reps: 12,
                weight: 95
            },
            // Glutes
            {
                name: 'Hip Thrust',
                muscleGroup: 'Glutes',
                sets: 3,
                reps: 10,
                weight: 215
            },
            // Calves
            {
                name: 'Calf Raises',
                muscleGroup: 'Calves',
                sets: 4,
                reps: 15,
                weight: 190
            }
        ]
    },

    // PUSH DAY 3
    {
        date: '2026-02-14',
        splitDay: 'Push',
        exercises: [
            // Chest
            {
                name: 'Barbell Bench Press',
                muscleGroup: 'Chest',
                sets: 4,
                reps: 8,
                weight: 195
            },
            {
                name: 'Incline Dumbbell Press',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 10,
                weight: 75
            },
            {
                name: 'Cable Flyes',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 12,
                weight: 35
            },
            // Shoulders
            {
                name: 'Overhead Press',
                muscleGroup: 'Shoulders',
                sets: 4,
                reps: 8,
                weight: 125
            },
            {
                name: 'Lateral Raises',
                muscleGroup: 'Shoulders',
                sets: 3,
                reps: 12,
                weight: 25
            },
            // Triceps
            {
                name: 'Tricep Dips',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 11,
                weight: 0
            },
            {
                name: 'Overhead Tricep Extension',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 12,
                weight: 60
            }
        ]
    },

    // PULL DAY 3
    {
        date: '2026-02-16',
        splitDay: 'Pull',
        exercises: [
            // Back
            {
                name: 'Deadlift',
                muscleGroup: 'Back',
                sets: 4,
                reps: 6,
                weight: 295
            },
            {
                name: 'Pull Ups',
                muscleGroup: 'Back',
                sets: 4,
                reps: 10,
                weight: 0
            },
            {
                name: 'Barbell Rows',
                muscleGroup: 'Back',
                sets: 4,
                reps: 8,
                weight: 165
            },
            {
                name: 'Lat Pulldown',
                muscleGroup: 'Back',
                sets: 3,
                reps: 10,
                weight: 150
            },
            {
                name: 'Face Pulls',
                muscleGroup: 'Back',
                sets: 3,
                reps: 15,
                weight: 45
            },
            // Biceps
            {
                name: 'Barbell Curl',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 10,
                weight: 80
            },
            {
                name: 'Hammer Curls',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 12,
                weight: 40
            }
        ]
    },

    // LEGS DAY 3
    {
        date: '2026-02-18',
        splitDay: 'Legs',
        exercises: [
            // Quads
            {
                name: 'Barbell Squat',
                muscleGroup: 'Quads',
                sets: 4,
                reps: 8,
                weight: 245
            },
            {
                name: 'Leg Press',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 10,
                weight: 400
            },
            {
                name: 'Leg Extension',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 12,
                weight: 130
            },
            // Hamstrings
            {
                name: 'Romanian Deadlift',
                muscleGroup: 'Hamstrings',
                sets: 4,
                reps: 8,
                weight: 205
            },
            {
                name: 'Leg Curl',
                muscleGroup: 'Hamstrings',
                sets: 3,
                reps: 12,
                weight: 100
            },
            // Glutes
            {
                name: 'Hip Thrust',
                muscleGroup: 'Glutes',
                sets: 3,
                reps: 10,
                weight: 225
            },
            // Calves
            {
                name: 'Calf Raises',
                muscleGroup: 'Calves',
                sets: 4,
                reps: 15,
                weight: 200
            }
        ]
    },

    // PUSH DAY 4
    {
        date: '2026-02-21',
        splitDay: 'Push',
        exercises: [
            // Chest
            {
                name: 'Barbell Bench Press',
                muscleGroup: 'Chest',
                sets: 4,
                reps: 8,
                weight: 200
            },
            {
                name: 'Incline Dumbbell Press',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 10,
                weight: 80
            },
            {
                name: 'Cable Flyes',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 12,
                weight: 35
            },
            // Shoulders
            {
                name: 'Overhead Press',
                muscleGroup: 'Shoulders',
                sets: 4,
                reps: 8,
                weight: 130
            },
            {
                name: 'Lateral Raises',
                muscleGroup: 'Shoulders',
                sets: 3,
                reps: 12,
                weight: 25
            },
            // Triceps
            {
                name: 'Tricep Dips',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 12,
                weight: 0
            },
            {
                name: 'Overhead Tricep Extension',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 12,
                weight: 60
            }
        ]
    },

    // PULL DAY 4
    {
        date: '2026-02-23',
        splitDay: 'Pull',
        exercises: [
            // Back
            {
                name: 'Deadlift',
                muscleGroup: 'Back',
                sets: 4,
                reps: 6,
                weight: 305
            },
            {
                name: 'Pull Ups',
                muscleGroup: 'Back',
                sets: 4,
                reps: 10,
                weight: 0
            },
            {
                name: 'Barbell Rows',
                muscleGroup: 'Back',
                sets: 4,
                reps: 8,
                weight: 170
            },
            {
                name: 'Lat Pulldown',
                muscleGroup: 'Back',
                sets: 3,
                reps: 10,
                weight: 155
            },
            {
                name: 'Face Pulls',
                muscleGroup: 'Back',
                sets: 3,
                reps: 15,
                weight: 47.5
            },
            // Biceps
            {
                name: 'Barbell Curl',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 10,
                weight: 85
            },
            {
                name: 'Hammer Curls',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 12,
                weight: 42.5
            }
        ]
    },

    // LEGS DAY 4
    {
        date: '2026-02-25',
        splitDay: 'Legs',
        exercises: [
            // Quads
            {
                name: 'Barbell Squat',
                muscleGroup: 'Quads',
                sets: 4,
                reps: 8,
                weight: 255
            },
            {
                name: 'Leg Press',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 10,
                weight: 420
            },
            {
                name: 'Leg Extension',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 12,
                weight: 135
            },
            // Hamstrings
            {
                name: 'Romanian Deadlift',
                muscleGroup: 'Hamstrings',
                sets: 4,
                reps: 8,
                weight: 215
            },
            {
                name: 'Leg Curl',
                muscleGroup: 'Hamstrings',
                sets: 3,
                reps: 12,
                weight: 105
            },
            // Glutes
            {
                name: 'Hip Thrust',
                muscleGroup: 'Glutes',
                sets: 3,
                reps: 10,
                weight: 235
            },
            // Calves
            {
                name: 'Calf Raises',
                muscleGroup: 'Calves',
                sets: 4,
                reps: 15,
                weight: 210
            }
        ]
    },

    // PUSH DAY 5
    {
        date: '2026-02-28',
        splitDay: 'Push',
        exercises: [
            // Chest
            {
                name: 'Barbell Bench Press',
                muscleGroup: 'Chest',
                sets: 4,
                reps: 8,
                weight: 205
            },
            {
                name: 'Incline Dumbbell Press',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 10,
                weight: 80
            },
            {
                name: 'Cable Flyes',
                muscleGroup: 'Chest',
                sets: 3,
                reps: 12,
                weight: 37.5
            },
            // Shoulders
            {
                name: 'Overhead Press',
                muscleGroup: 'Shoulders',
                sets: 4,
                reps: 8,
                weight: 135
            },
            {
                name: 'Lateral Raises',
                muscleGroup: 'Shoulders',
                sets: 3,
                reps: 12,
                weight: 27.5
            },
            // Triceps
            {
                name: 'Tricep Dips',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 12,
                weight: 0
            },
            {
                name: 'Overhead Tricep Extension',
                muscleGroup: 'Triceps',
                sets: 3,
                reps: 12,
                weight: 65
            }
        ]
    },

    // PULL DAY 5
    {
        date: '2026-03-02',
        splitDay: 'Pull',
        exercises: [
            // Back
            {
                name: 'Deadlift',
                muscleGroup: 'Back',
                sets: 4,
                reps: 6,
                weight: 315
            },
            {
                name: 'Pull Ups',
                muscleGroup: 'Back',
                sets: 4,
                reps: 11,
                weight: 0
            },
            {
                name: 'Barbell Rows',
                muscleGroup: 'Back',
                sets: 4,
                reps: 8,
                weight: 175
            },
            {
                name: 'Lat Pulldown',
                muscleGroup: 'Back',
                sets: 3,
                reps: 10,
                weight: 160
            },
            {
                name: 'Face Pulls',
                muscleGroup: 'Back',
                sets: 3,
                reps: 15,
                weight: 50
            },
            // Biceps
            {
                name: 'Barbell Curl',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 10,
                weight: 90
            },
            {
                name: 'Hammer Curls',
                muscleGroup: 'Biceps',
                sets: 3,
                reps: 12,
                weight: 45
            }
        ]
    },

    // LEGS DAY 5
    {
        date: '2026-03-04',
        splitDay: 'Legs',
        exercises: [
            // Quads
            {
                name: 'Barbell Squat',
                muscleGroup: 'Quads',
                sets: 4,
                reps: 8,
                weight: 265
            },
            {
                name: 'Leg Press',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 10,
                weight: 440
            },
            {
                name: 'Leg Extension',
                muscleGroup: 'Quads',
                sets: 3,
                reps: 12,
                weight: 140
            },
            // Hamstrings
            {
                name: 'Romanian Deadlift',
                muscleGroup: 'Hamstrings',
                sets: 4,
                reps: 8,
                weight: 225
            },
            {
                name: 'Leg Curl',
                muscleGroup: 'Hamstrings',
                sets: 3,
                reps: 12,
                weight: 110
            },
            // Glutes
            {
                name: 'Hip Thrust',
                muscleGroup: 'Glutes',
                sets: 3,
                reps: 10,
                weight: 245
            },
            // Calves
            {
                name: 'Calf Raises',
                muscleGroup: 'Calves',
                sets: 4,
                reps: 15,
                weight: 220
            }
        ]
    }
];

export default workoutLog;