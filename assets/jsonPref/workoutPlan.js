const workoutPlan = [
    {
        name: 'Push',
        orderIndex: 0,
        groups: [
            {
                name: 'Chest',
                exercises: [
                    { name: 'Bench Press' },
                    { name: 'Incline Dumbbell Press' },
                    { name: 'Cable Flyes' }
                ]
            },
            {
                name: 'Shoulders',
                exercises: [
                    { name: 'Overhead Press' },
                    { name: 'Lateral Raises' },
                    { name: 'Front Raises' }
                ]
            },
            {
                name: 'Triceps',
                exercises: [
                    { name: 'Tricep Dips' },
                    { name: 'Overhead Tricep Extension' },
                    { name: 'Tricep Pushdowns' }
                ]
            }
        ]
    },
    {
        name: 'Pull',
        orderIndex: 1,
        groups: [
            {
                name: 'Back',
                exercises: [
                    { name: 'Deadlifts' },
                    { name: 'Pull-ups' },
                    { name: 'Barbell Rows' }
                ]
            },
            {
                name: 'Biceps',
                exercises: [
                    { name: 'Barbell Curls' },
                    { name: 'Hammer Curls' },
                    { name: 'Concentration Curls' }
                ]
            },
            {
                name: 'Rear Delts',
                exercises: [
                    { name: 'Face Pulls' },
                    { name: 'Reverse Flyes' },
                    { name: 'Bent Over Lateral Raises' }
                ]
            }
        ]
    },
    {
        name: 'Legs',
        orderIndex: 2,
        groups: [
            {
                name: 'Quads',
                exercises: [
                    { name: 'Squats' },
                    { name: 'Leg Press' },
                    { name: 'Leg Extensions' }
                ]
            },
            {
                name: 'Hamstrings',
                exercises: [
                    { name: 'Romanian Deadlifts' },
                    { name: 'Leg Curls' },
                    { name: 'Walking Lunges' }
                ]
            },
            {
                name: 'Calves',
                exercises: [
                    { name: 'Standing Calf Raises' },
                    { name: 'Seated Calf Raises' },
                    { name: 'Calf Press on Leg Press' }
                ]
            }
        ]
    }
];

export default workoutPlan;
