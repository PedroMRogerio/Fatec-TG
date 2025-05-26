import { TAG_CANCEL, TAG_OK, TAG_CLOSED, TAG_OPEN, TAG_OVERDUE, TAG_CANCEL2, TAG_CLOSED2, TAG_OK2, TAG_OPEN2, TAG_OVERDUE2, TAG_ROUTE, TAG_ROUTE2 } from "../styles/colorStyles";

export function CardColor(status: string): [string, string, ...string[]] {
    switch (status) {
        case 'closed':
            return TAG_CLOSED
        case 'ok':
            return TAG_OK
        case 'open':
            return TAG_OPEN
        case 'cancel':
            return TAG_CANCEL
        case 'overdue':
            return TAG_OVERDUE
        case 'route':
            return TAG_ROUTE
        default:
            return ['transparent', 'transparent', 'transparent', 'transparent']
    }
}

export function CardColor2(status: string): [string, string, ...string[]] {
    switch (status) {
        case 'closed':
            return TAG_CLOSED2
        case 'ok':
            return TAG_OK2
        case 'open':
            return TAG_OPEN2
        case 'cancel':
            return TAG_CANCEL2
        case 'overdue':
            return TAG_OVERDUE2
        case 'route':
            return TAG_ROUTE2
        default:
            return ['transparent', 'transparent', 'transparent', 'transparent']
    }
}