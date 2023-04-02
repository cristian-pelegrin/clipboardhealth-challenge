import { deterministicPartitionKey } from './solution'

describe('deterministicPartitionKey', () => {
  it('returns 0 partition key if event is not defined', () => {
    const result = deterministicPartitionKey();
    expect(result).toEqual('0');
  });

  it('returns 0 partition key if event is null', () => {
    const result = deterministicPartitionKey(null);
    expect(result).toEqual('0');
  });
  
  it('returns event.partitionKey if it exists', () => {
    const partitionKey = 'test-partition-key'

    const result = deterministicPartitionKey({ partitionKey });
    expect(result).toEqual(partitionKey);
  });
  
  it('returns hash of event if event.partitionKey does not exist', () => {
    const event = { test: 'hi' };
    const eventHash = '8a3031431985e765a17bca70d641144cb47aabcd3599107d7e87bfc3567f054154149eb73656819b60a99a5bac64494ca1ed29355682c819b60691ea9041a5ba';

    const result = deterministicPartitionKey(event);
    expect(result).toEqual(eventHash);
  });
  
  it('returns partitionKey stringifies  if it is not a string', () => {
    const event = { partitionKey: { test: 'hi' } };

    const result = deterministicPartitionKey(event);
    expect(result).toEqual('{"test":"hi"}');
  });
  
  it('returns hash of partitionKey if length > 256', () => {
    const event = { partitionKey: 'x'.repeat(257) };
    const expectedHash = '1ec88d97b4bc830c66b056c760d2deebeac5323f9f9485c65b063299fdbdc446c232fa2a29d221881a68ef8522e8d0bfab7a1c65e02956468a514fc3f2dd0efa';

    const result = deterministicPartitionKey(event);
    expect(result).toEqual(expectedHash);
  });
});