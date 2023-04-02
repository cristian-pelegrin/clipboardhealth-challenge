import { createHash } from 'crypto';

function getPartitionDigest(data) {
    return createHash("sha3-512").update(data).digest("hex");
}
export function deterministicPartitionKey(event) {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;

    if (!event) {
        return TRIVIAL_PARTITION_KEY;
    }

    if (!event.partitionKey) {
        const data = JSON.stringify(event);

        return getPartitionDigest(data);
    }

    const candidate = (typeof event.partitionKey === 'string')
        ? event.partitionKey
        : JSON.stringify(event.partitionKey)

    if (candidate.length < MAX_PARTITION_KEY_LENGTH) {
        return candidate
    }

    return getPartitionDigest(candidate);
};