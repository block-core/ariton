import { inject, Injectable } from '@angular/core';
import { ConnectionService, ConnectionType } from './connection.service';

@Injectable({
  providedIn: 'root',
})
/** TODO: This work should run the background and not in the front end. */
export class WorkerService {
  connection = inject(ConnectionService);

  constructor() {}

  async start() {
    // Define the task to be processed
    const processTask = async () => {
      try {
        // Your processing logic here
        console.log('Processing task...');

        console.log('connections count:', this.connection.requests().length);

        console.log('CONNECTIONS:', this.connection.requests());

        // Process incoming VCs in the connection service.
        // Filter connections where data.tag['type'] is 'credential'
        const credentialRequests = this.connection
          .requests()
          .filter((request) => request.record.tags['type'] === 'credential');

        console.log('credentialRequests:', credentialRequests);

        for (const request of credentialRequests) {
          console.log('Processing connection:', request);
          // Process the connection here
          // For example, you can accept the connection request
          // await this.connection.accept(connection);
          const friendRequestRecord = await this.connection.acceptFriendRequest(request);

          // Copy over the record id so we have a reference between the raw VC and the connection record.
          request.data.recordId = friendRequestRecord?.id;
          request.data.did = request.record.author;

          console.log('REQUEST DATA:', request.data);

          // Persist the connection locally. This is the foundation for permissions checks, friends lists and more.
          const connectionEntry = await this.connection.create(request, ConnectionType.Friend);
          console.log('Connection Entry that was made: ', connectionEntry);

          // Delete the request after accepting it, we don't need it anymore.
          await this.connection.deleteRequest(request);
        }

        // Example: Use friend and connection services
        // const friends = await this.friend.getFriends();
        // const connections = await this.connection.getConnections();
        // console.log(friends, connections);
      } catch (error) {
        console.error('Error processing task:', error);
      } finally {
        // Re-schedule the task to run after 1 minute
        setTimeout(processTask, 60000);
      }
    };

    // Run the task immediately
    await processTask();
  }
}
