export default function prismaErrorCode(code, item) {
    return {
        'P2002': `Unique constraint failed on the ${item}`
    }[code];
}
