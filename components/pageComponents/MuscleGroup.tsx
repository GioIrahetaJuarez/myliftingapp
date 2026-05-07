
import { Text, View } from 'react-native';

import ExerciseItem from './ExersiceItem';
import styles from './TodayBoard.styles';

function MuscleGroup({ group, groupIndex, isExerciseHidden, onFinished }) {
    return (
        <View style={styles.muscleGroup}>
            <Text style={styles.groupTitle}>{group.name}</Text>
            {group.exercises.map((exercise, exerciseIndex) => (
                <ExerciseItem
                    key={exerciseIndex}
                    exercise={exercise.name}
                    groupIndex={groupIndex}
                    exerciseIndex={exerciseIndex}
                    isHidden={isExerciseHidden(groupIndex, exerciseIndex)}
                    onFinished={onFinished}
                />
            ))}
        </View>
    );
}

export default MuscleGroup;
