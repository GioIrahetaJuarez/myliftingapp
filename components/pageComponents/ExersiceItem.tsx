
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import styles from './TodayBoard.styles';

function ExerciseItem({ exercise, groupIndex, exerciseIndex, isHidden, onFinished }) {
    const [setsReps, setSetsReps] = useState('6x12');

    if (isHidden) return null;

    return (
        <View style={styles.exerciseRow}>
            <Text style={styles.exerciseName}>{exercise}</Text>
            <TextInput
                style={styles.input}
                value={setsReps}
                onChangeText={setSetsReps}
            />
            <Pressable
                style={styles.doneButton}
                onPress={() => onFinished(groupIndex, exerciseIndex, setsReps)}
            >
                <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
            
        </View>
    );
}

export default ExerciseItem;
