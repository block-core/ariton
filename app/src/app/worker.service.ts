import { inject, Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

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
          this.connection.acceptFriendRequest(request);
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
