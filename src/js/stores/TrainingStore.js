import {EventEmitter} from "events";

class TrainingStore extends EventEmitter {
    constructor() {
        super();

        this.workouts = [
        {
            "id": "8d2b699a-d96f-470a-b56b-a9790fa0617b",
            "date": "2017-01-11T17:00:00.000Z",
            "exercises": [
                {
                    "movement": {
                        "name": "low bar back squat"
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "repetitions": 5
                        },
                        {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "repetitions": 5
                        },
                        {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "repetitions": 5
                        },
                                                {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "repetitions": 5
                        },
                                                {
                            "weight": {
                                "magnitude": 315,
                                "unit": "lbs"
                            },
                            "repetitions": 5
                        },
                    ]
                },
                {
                    "movement": {
                        "name": "bench press"   
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": {
                                "magnitude": 135,
                                "unit": "pounds"
                            },
                            "repetitions": 5
                        },
                        {
                            "weight": {
                                "magnitude": 135,
                                "unit": "pounds"
                            },
                            "repetitions": 5
                        },
                        {
                            "weight": {
                                "magnitude": 135,
                                "unit": "pounds"
                            },
                            "repetitions": 5
                        }
                    ]
                }
            ]
        },
        {
            "id": "7c507166-1a1e-4997-a434-a312f70d6536",
            "date": "2017-01-01T17:00:00.000Z",
            "exercises": [
                {
                    "movement": {
                        "name": "low bar back squat"
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": {
                                "magnitude": 320,
                                "unit": "pounds"
                            },
                            "repetitions": 5
                        },
                        {
                            "weight": {
                                "magnitude": 320,
                                "unit": "pounds"
                            },
                            "repetitions": 5
                        },
                        {
                            "weight": {
                                "magnitude": 320,
                                "unit": "pounds"
                            },
                            "repetitions": 5
                        }
                    ]
                },
                {
                    "movement": {
                        "name": "overhead press"   
                    },
                    "rest_minutes": 1.5,
                    "sets": [
                        {
                            "weight": {
                                "magnitude": 120,
                                "unit": "pounds"
                            },
                            "repetitions": 5
                        },
                        {
                            "weight": {
                                "magnitude": 120,
                                "unit": "pounds"
                            },
                            "repetitions": 5
                        },
                        {
                            "weight": {
                                "magnitude": 120,
                                "unit": "pounds"
                            },
                            "repetitions": 5
                        }
                    ]
                }
            ]
        }];
    }

    getWorkouts() {
        return this.workouts;
    }

    getWorkout(id) {
        return this.workouts.find(x => x.id === id);
    }

    createWorkout(workout) {
        this.workouts.push(workout);
        this.emit('change');
    }
}

const trainingStore = new TrainingStore();

export default trainingStore;