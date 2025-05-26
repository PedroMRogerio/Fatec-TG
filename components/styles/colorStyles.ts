import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export const TAG_CLOSED: [string, string, ...string[]] = ['#ccc', 'transparent', 'transparent', '#ccc']
export const TAG_OK: [string, string, ...string[]] = ['#88E788', 'transparent', 'transparent', '#88E788']
export const TAG_OPEN: [string, string, ...string[]] = ['#f5c345', 'transparent', 'transparent', '#f5c345']
export const TAG_CANCEL: [string, string, ...string[]] = ['#E83256', 'transparent', 'transparent', '#E83256']
export const TAG_OVERDUE: [string, string, ...string[]] = ['#E83256', 'transparent', 'transparent', '#E83256']

export const TAG_CLOSED2: [string, string, ...string[]] = ['#ccc', 'white', 'white', '#ccc']
export const TAG_OK2: [string, string, ...string[]] = ['#88E788', 'white', 'white', '#88E788']
export const TAG_OPEN2: [string, string, ...string[]] = ['#f5c345', 'white', 'white', '#f5c345']
export const TAG_CANCEL2: [string, string, ...string[]] = ['#E83256', 'white', 'white', '#E83256']
export const TAG_OVERDUE2: [string, string, ...string[]] = ['#E83256', 'white', 'white', '#E83256']

export const freteCardsStyle = StyleSheet.create({
    container: {
        width: width * 1,
        padding: 10,
    },
    default: {
        padding: 15,
        width: width * 0.90,
        borderWidth: 0.85,
        borderRadius: 5,
        borderColor: 'black',
        marginBottom: 10,
        overflow: 'hidden',
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
    date: {
        fontSize: 15,
        marginBottom: 10,
    },
});
