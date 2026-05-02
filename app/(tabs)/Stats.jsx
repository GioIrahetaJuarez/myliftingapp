import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from "react-native-calendars";

function Stats() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [workoutLog, setWorkoutLog] = useState([]);

    useEffect(() => {
        const getWorkoutLog = async () => {
            const data = await AsyncStorage.getItem('workoutLog');
            setWorkoutLog(JSON.parse(data) || []);
        };
        getWorkoutLog();
    }, []);

    return (
        <View>
            <View>
                <Link href='/'>Home</Link>
            </View>
            <View>
                <Text>Stats: When did u hit Broh</Text>
                <Calendar
                    current={date}
                    onDayPress={(day) => {
                        if (day.dateString !== date) {
                            setDate(day.dateString);
                        }
                    }}
                    dayComponent={({ date, state }) => {
                        const workout = workoutLog.find(w => w.date === date.dateString);
                        return (
                            <TouchableOpacity onPress={() => setDate(date.dateString)}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: workout ? '#001eff' : 'transparent',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{ color: state === 'disabled' ? 'gray' : workout ? 'white': 'black'}}>
                                    {date.day}
                                </Text>
                                {workout && (
                                    <Text style={{ fontSize: 8, color: '#ffffff', textAlign: 'center' }}>
                                        {workout.splitDay}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
}

export default Stats;