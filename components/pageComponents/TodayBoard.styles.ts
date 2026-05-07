import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    dayName: {
        fontSize: 16,
        color: '#888',
        marginBottom: 4,
    },
    workoutTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    muscleGroup: {
        marginBottom: 24,
    },
    groupTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    exerciseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    exerciseName: {
        flex: 1,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 6,
        width: 60,
        textAlign: 'center',
    },
    doneButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 6,
    },
    doneButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    statsLink: {
        color: 'blue',
        paddingHorizontal: 8,
    },
});

export default styles;
