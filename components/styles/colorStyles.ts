import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export const TAG_CLOSED: [string, string, ...string[]] = ['white', 'transparent', 'transparent', 'white']
export const TAG_OK: [string, string, ...string[]] = ['#00FFF0', 'transparent', 'transparent', '#00FFF0']
export const TAG_OPEN: [string, string, ...string[]] = ['#88E788', 'transparent', 'transparent', '#88E788']
export const TAG_CANCEL: [string, string, ...string[]] = ['#FFFFC5', 'transparent', 'transparent', '#FFFFC5']
export const TAG_OVERDUE: [string, string, ...string[]] = ['#E83256', 'transparent', 'transparent', '#E83256']

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
