export default function prismaErrorCode(code, item = '') {
    return {
        'P2002': `Unique constraint failed on the ${item}`,
        'P2025': 'Record to delete does not exist.'
    }[code];
}
