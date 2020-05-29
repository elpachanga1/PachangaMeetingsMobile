import { observable, action } from 'mobx';
import { createContext } from 'react';
import { backendAPIURL } from '../../config';
import axios from 'axios';

class MeetingsStore {
  @observable meetings = [];
  @observable state = 'pending'; // "pending" / "done" / "error"

  @action
  async getMeetings() {
    try {
      this.state = 'pending';
      const response = await axios.get(backendAPIURL);

      this.meetings = response.data.body;
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
    }
  }

  @action
  async addMeeting(meeting) {
    try {
      this.state = 'pending';
      const response = await axios.post(backendAPIURL, meeting);

      this.meetings = [
        ...this.meetings,
        { ...meeting, id: response.data.body.id },
      ];
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
    }
  }

  @action
  async editMeeting(meeting) {
    try {
      this.state = 'pending';
      await axios.put(backendAPIURL, meeting);

      let newMeetings = this.meetings.filter((x) => x.id !== meeting.id);
      this.meetings = [newMeetings, meeting];
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
    }
  }

  @action
  async removeMeeting(meeting) {
    try {
      this.state = 'pending';
      await axios.put(backendAPIURL, meeting);

      this.meetings = this.meetings.filter((x) => x.id !== meeting.id);
      this.state = 'done';
    } catch (error) {
      console.log(error);
      this.state = 'error';
    }
  }
}

export const MeetingsStoreContext = createContext(new MeetingsStore());
